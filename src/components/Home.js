import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div>
    <p>
      <Link to="off-the-main-thread">Off the main thread</Link>
    </p>
    <p>
      <Link to="on-the-main-thread">On the main thread</Link>
    </p>
  </div>
);
