// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';

const MODAL_CONTAINER_STYLE = {
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  bottom: 0,
  top: 0,
  left: 0,
  right: 0,
  zIndex: 200,
};

const MODAL_STYLE = {
  flex: 1,
  zIndex: 100,
};

const OVERLAY_STYLE = {
  position: 'absolute',
  backgroundColor: 'rgba(240, 240, 240, 0.8)',
  bottom: 0,
  top: 0,
  left: 0,
  right: 0,
};

type Props = {
  children: React.Node,
  onRequestClose: () => void,
  show: boolean,
};

export default function Modal({
  children,
  onRequestClose,
  show,
}: Props): React.Node {
  const portalNode = React.useRef(document.createElement('div'));
  React.useEffect(() => {
    const body = document.body;
    const portalElt = portalNode.current;
    if (body) {
      body.appendChild(portalElt);
    }
    return () => {
      if (body) {
        body.removeChild(portalElt);
      }
    };
  }, []);

  const onOverlayClick = () => onRequestClose();

  return ReactDOM.createPortal(
    <div style={MODAL_CONTAINER_STYLE}>
      <div role="button" style={OVERLAY_STYLE} onClick={onOverlayClick} />
      <div
        className="section__content-inner section__content-inner--alt"
        style={MODAL_STYLE}
      >
        {children}
      </div>
    </div>,
    portalNode.current,
  );
}
