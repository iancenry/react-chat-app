import React from 'react';

export const LightningBolt = ({ giphyState, onCommandClick }) => (
  <div onClick={onCommandClick} style={{ display: 'flex' }}>
    <svg width='30' height='30' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        fill='#663399'
      />
    </svg>
  </div>
);
