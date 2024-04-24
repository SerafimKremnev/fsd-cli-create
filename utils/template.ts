import { createName } from "../services/createFile.service.js";

export const capitalize = (name: string) => name.charAt(0).toLowerCase() + name.slice(1, name.length + 1)

export const tsxTemplate = async (n: string, defaultExport: boolean, withCva: boolean) => {
  const name = await createName(n, 'cc')
  return `import React, { FC } from 'react';
${withCva ? `import s from './${n}${n.includes('-') ? '-s' : 'S'}tyles';` : "import { cva } from 'class-variance-authority';"}

interface ${name}Props {
  className?: string;
}
${withCva ? '' :
`const cvaRoot = cva([
  '${name}-cvaRoot',
  '',
], {
  variants: {},
  defaultVariants: {},
});

`}
${!defaultExport ? `export ` : ''}const ${name}: FC<${name}Props> = ({}) => {
  return (
    <div className={s.cvaRoot()}></div>
  );
};

${defaultExport ? `export default ${name}` : ''}
`;

}

export const typesTemplate = (name: string) => `export interface I${name} {

}
`;

export const styleTemplate = (name: string) => `import { cva } from 'class-variance-authority';

const cvaRoot = cva([
  '${name}-cvaRoot',
  '',
], {
  variants: {},
  defaultVariants: {},
});

const styles = {
  cvaRoot,
}

export default styles;
`;

export const dataTemplate = (name: string) => `export const data${name} = {

}
`;

export const hooksTemplate = (name: string, defaultExport?: boolean) => `import { useEffect, useState } from 'react';

${!defaultExport ? `export ` : ''}const use${name} = () => {
  
}
${defaultExport ? `export default ${name}` : ''}
`;

