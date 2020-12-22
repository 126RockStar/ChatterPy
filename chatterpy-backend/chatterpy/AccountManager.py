from accounts.models import Account
from contacts.models import Contact
from conversations.models import Conversation, Message
from django.conf import settings
import messagebird
import phonenumbers


def verify_number_format(number):
    return phonenumbers.format_number(phonenumbers.parse(number, "US"), phonenumbers.PhoneNumberFormat.E164)


class AccountManager:

    def __init__(self, account_id):
        self.account_id = account_id
        self.bird_client = messagebird.Client(settings.MESSAGEBIRD_API_TOKEN)

    def account(self):
        return Account.objects.filter(id=self.account_id).first()

    def credits(self):
        account = self.account()
        return account.credits

    def contact_exists(self, phone_number):
        contact_exist = Contact.objects.filter(account=self.account()).filter(
            phone_number=verify_number_format(phone_number)).exists()
        return contact_exist

    def get_contact(self, phone_number):
        contact = Contact.objects.filter(account=self.account()).filter(
            phone_number=verify_number_format(phone_number)).first()
        return contact

    def create_contact(self, first_name, last_name, phone_number):
        account = self.account()
        vn = verify_number_format(phone_number)
        temp_contact = Contact.objects.filter(account=account).filter(phone_number=vn)

        '''If contact does not exist'''
        if temp_contact.exists:
            contact = Contact.objects.create(first_name=first_name, last_name=last_name,
                                 phone_number=vn, account=account)
            try:
                contact.save()
                print("saving contact")
                return contact
            except:
                raise Exception("Could Not Save Contact")
        else:
            return temp_contact.first()

    def add_credits(self, amount):
        account = self.account()
        account.credits = account.credits + amount
        account.save()

    def subtract_credits(self, amount):
        account = self.account()
        account.credits = account.credits - amount
        account.save()

    def create_conversation(self, conversation_id, contact):
        account = self.account()
        conversation_exists = Conversation.objects.filter(account=account).filter(
            conversation_id=conversation_id).exists()
        print(conversation_exists)
        if not conversation_exists:
            print("conversation does not exist")
            try:
                conversation = Conversation.objects.create(conversation_id=conversation_id, contact=contact,
                                                           account=account)
                conversation.save()
                return conversation
            except:
                raise Exception("Could Not Save Conversation")
        else:
            print("conversation exists")
            conversation = Conversation.objects.filter(account=account).filter(conversation_id=conversation_id).first()
            return conversation

    def create_message(self, conversation, originator, recipient, message, msg_id):
        m = Message.objects.create(originator=originator, recipient=recipient,
                                   message=message, message_id=msg_id, conversation=conversation)
        try:
            m.save()
            return m
        except:
            raise Exception("Could Not Save Message")

        pass

    def send_message(self, originator, recipient, message):
        try:
            msg = self.bird_client.message_create(verify_number_format(originator),
                                                verify_number_format(recipient), message, {"datacoding": "auto"})
        except:
            raise Exception("Could not create Message")

        return msg

    def handle_incoming_message(self, first_name, last_name, message, originator, recipient):

        conversation_id = str(int(originator) + int(recipient))
        contact = self.create_contact(first_name, last_name, originator)
        conversation = self.create_conversation(conversation_id, contact)
        self.create_message(conversation, originator, recipient, message, "dummy")





