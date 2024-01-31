export const capitalize = (name) => name.charAt(0).toLowerCase() + name.slice(1, name.length + 1);
export const tsxTemplate = (name, defaultExport) => `
import React from 'react';
import { cva } from 'class-variance-authority';

interface ${name}Props {
  className?: string
}

const cvaRoot = cva([
  '${capitalize(name)}-cvaRoot',
  '',
], {
  variants: {},
  defaultVariants: {}
});

const ${name}: FC<${name}Props> = ({ className }) => {
  return (
    <></>
  );
};
export ${defaultExport ? 'default' : ''} ${name};
`;
export const typesTemplate = (name) => `
export interface I${name} {

}
`;
export const dataTemplate = (name) => `
export const data${name} {

}
`;
export const hooksTemplate = (name, defaultExport) => `
import { useEffect, useState } from 'react';

const use${name} = () => {
  
}
export ${defaultExport ? 'default' : ''} ${name};
`;
