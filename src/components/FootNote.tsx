import * as React from "react";
import pkg from '../../package.json';

export const FootNote: React.FC<{}> = props => {
  return (
    <footer>
      Vileo {pkg.version} -{' '}
      Made by Lukas Bach.{' '}
      {/* eslint-disable-next-line react/jsx-no-target-blank */}
      <a href="https://lukasbach.com" target="_blank">lukasbach.com</a>{' '}
      <a href="https://github.com/lukasbach/vileo" target="_blank" rel="noopener noreferrer">GitHub Repo</a>
    </footer>
  )
};
