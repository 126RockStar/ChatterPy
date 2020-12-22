
## Order Of Deployment | Skip to Step 3 Unless New Cluster

1. Creating the Cluster
  - Kubernetes Metric Server - Install One Click
    - Can't install Manually DO Issue
  - Nginx Ingress Controller - Install One Click 
    - Or Manually(method I used for your cluster)
      - https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-with-cert-manager-on-digitalocean-kubernetes
  - Cert-Manager
    - https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-with-cert-manager-on-digitalocean-kubernetes
    - Used updated version 0.41
2. Creating the Container Registry
  - Build and Push images with tags of the versions. Provides you with the ability to always be able to go back to previous image versions if the next version is incompatible.
    - Postgres image > database must be initilized.
    - Django / Python:3.7-slim > just push and store.
3. Deployment of Kubernetes Configurations Files:
  - Use the CMD: `kubectl apply -f <file||directory name>.yaml`
  1. Ideally First we would deploy any Secrets 
    - They usually are utilized by services/pods/jobs/etc. 
    - None except Docker Registry Secret needs to be added.
  2. Deploy Configuration Maps
    - Change the password and host on the file to the Database dbname/pass/host/etc.
    - `kubectl apply -f dj-configmap.yaml`
    - ConfigMaps work as '.env' files.
  3. Deployment of Services (LoadBalancer/ClusterIP/NodePort)
    - `kubectl apply -f dj-service.yaml`
    - These is to assure access between the pods. 
  4. Deploy Jobs - Django Migrations
    - `kubectl apply -f dj-migration.yaml` - Needs to be perferably before deployments for database initilization.
  5. Deployment the deployments that are in the files.
    - `kubectl apply -f dj-deployments.yaml`


## Container Registry 

- Build the image after making some changes. This image will be under the name of the image, e.g. 'chatterpy_web' with the tag latest, can be seen with this cmd:
  - `docker images` 
- We need to tag this image
  - `docker tag <image id> <container-register-url>/<image name>:<tag>`
- In order to be able to update images, to your Container Registry you need to use the `doctl` command to login for authtications:
  - `doctl register login`
  - If Pods are failing to pull because of access: The following initilizes a Secret that kubernetes will use to access the Container Registry
    - `doctl registry kubernetes-manifest | kubectl apply -f -`
- Once 'register login' has completed, you can push the image with:
  - `docker push <container-register-url>/<image name>:<tag>`

## Rolling Updates

* RollingUpdate: New pods are added gradually, and old pods are terminated gradually (Assigned)

- The images need to be in your Container Registry, or pulled from a Registry that the Cluster has acces to.
- There is a few methods on running updates. 
  1. Creating or duplicating an new deployment
    - Duplicate the deployment, e.g. `dj-deployment-v2.yaml`, 
      - Add changes to the new file,e.g. the new `image` tag
      - Assure Images are already in Registry
      - Deploy updated yaml file:
        - `kubectl apply -f dj-deployment-v2.yaml` 
      - Might take a minute or two for your Pods to reboot. 
  2. Running the `kubectl` command, will change the image for the pods, not in a local file.
    - `kubectl patch --image:<container-registery-url>/<image name>:<new tag>`
  3. Using Scale/Rollout
```
# List deployments:
kubectl get deploy

# Update a deployment with a manifest file:
kubectl apply -f test.yaml

# Scale a deployment “test” to 3 replicas:
kubectl scale deploy/test --replicas=3

# Watch update status for deployment “test”:
kubectl rollout status deploy/test

# Pause deployment on “test”:
kubectl rollout pause deploy/test

# Resume deployment on “test”:
kubectl rollout resume deploy/test

# View rollout history on “test”:
kubectl rollout history deploy/test

# Undo most recent update on “test”:
kubectl rollout undo deploy/test

# Rollback to specific revision on “test”:
kubectl rollout undo deploy/test --to-revision=1
```

## Scaling | Advance Metric-System | Resrouce Request

- For Autoscaling to work we neede to add the Advance Metric System Plugin, which I have already deployed: https://marketplace.digitalocean.com/apps/kubernetes-metrics-server
  - Run scaling test: `kubectl run -i --tty service-test --image=busybox`
    - `while true; do wget -q -O- https://test.chatterpy.com/admin ; done`
- Scaling can be done with command:
  - `kubectl autoscale deployment <deployment-name> --cpu-percent=50 --min=1 --max=10`
  - When placed under load it will automatically deploy more pods to even out resources

### Resources CPU | Memory 

* The following is grabbed from: https://cloud.google.com/blog/products/gcp/kubernetes-best-practices-resource-requests-and-limits
* CPU resources are defined in millicores. If your container needs two full cores to run, you would put the value “2000m”. If your container only needs ¼ of a core, you would put a value of “250m” 
  * If the CPU request is higher than the care count your pod will never be scheduled.
* Memory resources are defined in bytes. Normally, you give a mebibyte value for memory (this is basically the same thing as a megabyte), but you can give anything from bytes to petabytes.

- As of right now the pods request resources:
  - Starting resources:
    - memory: "500Mi"
    - cpu: "250m"
  - Limit Resources:
     - memory: "1000Mi"
     - cpu: "2000m"

## Authenticating Users

* This is how you would create/authenticate Users for the DO Cluster: Step 1 - 2: 
  * https://www.digitalocean.com/community/tutorials/recommended-steps-to-secure-a-digitalocean-kubernetes-cluster

### Step 1: Enabling User Authentication

Change 'sammy' with the 'usersname'
```sh
mkdir ~/certs

openssl genrsa -out ~/certs/sammy.key 4096

nano ~/certs/sammy.csr.cnf
```

- Paste the following: 
  ```
  [ req ]
  default_bits = 2048
  prompt = no
  default_md = sha256
  distinguished_name = dn
  [ dn ]

  CN = sammy // <-- Username
  O = developers // <-- Position

  [ v3_ext ]
  authorityKeyIdentifier=keyid,issuer:always
  basicConstraints=CA:FALSE
  keyUsage=keyEncipherment,dataEncipherment
  extendedKeyUsage=serverAuth,clientAuth <-- will allow users to authenticate their local clients with the DOKS cluster using the certificate once it’s signed.
  ```
  
- Create 'sammy' certificate request:
  - `openssl req -config ~/certs/sammy.csr.cnf -new -key ~/certs/sammy.key -nodes -out ~/certs/sammy.csr`
- Check Certificate:
  - `openssl req -in ~/certs/sammy.csr -noout -text`

* Repeat the same procedure to create CSRs for any additional users. Once you have all certificate signing requests saved in the administrator’s ~/certs folder, proceed with the next step to approve them.


* Creating the Certificate Request for the cluster.
* Closer Look at Certificate Request(Change values from Sammy to new user name):
  - name: sammy-authentication creates a metadata identifier, in this case called sammy-authentication.
  - request: $(cat ~/certs/sammy.csr | base64 | tr -d '\n') sends the sammy.csr certificate signing request to the cluster encoded as Base64.
  - server auth and client auth specify the intended usage of the certificate. In this case, the purpose is user authentication.

```
cat <<EOF | kubectl apply -f -
apiVersion: certificates.k8s.io/v1beta1
kind: CertificateSigningRequest
metadata:
  name: sammy-authentication    
spec:
  groups:
  - system:authenticated
  request: $(cat ~/certs/sammy.csr | base64 | tr -d '\n') 
  usages:
  - digital signature
  - key encipherment
  - server auth
  - client auth
EOF
```

Align the Requester URL with the new User by using the output of:
- `kubectl get csr`

Approve Request with:
- `kubectl certificate approve <new-user-authentication>`

Now that the CSR is approved, you can download it to the local machine by running:
- `kubectl get csr sammy-authentication -o jsonpath='{.status.certificate}' | base64 --decode > ~/certs/sammy.crt`
 
Build Remote Users Kubeconfig
* Make sure to remove all other configurations from your Config files leave only what is needed.
* `cp ~/.kube/config ~/.kube/config-sammy`
* `nano ~/.kube/config-sammy`

```
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: certificate_data
  name: do-nyc1-do-cluster
contexts:
- context:
    cluster: do-nyc1-do-cluster
    user: sammy
  name: do-nyc1-do-cluster
current-context: do-nyc1-do-cluster
kind: Config
preferences: {}
users:
- name: sammy
  user:
    client-certificate: /home/your_local_user/certs/sammy.crt
    client-key: /home/your_local_user/certs/sammy.key
```

Test, with the command:
- `kubectl --kubeconfig=/home/your_local_user/.kube/config-sammy cluster-info`
- It should throw an error.

### Step 2 - Authorizing Users Through Role Based Access Control(RBAC)

- Grant Permission:
  - `kubectl create rolebinding sammy-edit-role --clusterrole=edit --user=sammy --namespace=default`
- Verify User Permissions by listing pods in deauflt: expected output = yes
  - `kubectl --kubeconfig=/home/your_local_user/.kube/config-sammy auth can-i get pods`

- Revoking Permissions:
  - `kubectl delete rolebinding sammy-edit-role`
- Verify it has been revoked: expected output = Error
  - `kubectl --kubeconfig=/home/localuser/.kube/config-sammy --namespace=default get pods`


## Changing from test.chatterpy.com --> api.chatterpy.com

* There will be down time about an hour or so until the new SSL Certificate gets requested and accepted.
* Steps:
  * Delete the Domains in DigitalOcean
  * Delete the `api.chatterpy.com` records 
  * Add another DNS Record 'api.chatterpy.com' with the LoadBalancers IP 
  * Configure the file ingress_nginx_svc.yaml:
    * `service.beta.kubernetes.io/do-loadbalancer-hostname: "test.chatterpy.com"` 
  * Configure the file dj-ingress.yaml so that it looks like this:
    ```
    spec:
      tls:
        - hosts:
            - api.chatterpy.com
          secretName: chatterpy-tls
      rules:
        - host: api.chatterpy.com
          http:
            paths:
              - backend:
                  serviceName: chatterpy-django-svc
                  servicePort: 80
    ```
    
* Now wait until certifications become approved.
