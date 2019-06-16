import * as React from 'react';

export interface LoadingSpinnerProps {
  type: 'Multiple' | 'Single';
  color?: string;
  size: number;
}

const LoadingSpinner: React.FunctionComponent<LoadingSpinnerProps> = props => {
  return (
    <React.Fragment>
      {props.type === 'Single' && (
        <div
          style={{ width: props.size, height: props.size }}
          className={`preloader-wrapper active`}
        >
          <div style={{ borderColor: props.color }} className="spinner-layer">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
      )}
      {props.type === 'Multiple' && (
        <div className={`preloader-wrapper ${props.size} active`}>
          <div className="spinner-layer spinner-blue">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>

          <div className="spinner-layer spinner-red">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>

          <div className="spinner-layer spinner-yellow">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>

          <div className="spinner-layer spinner-green">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default LoadingSpinner;
