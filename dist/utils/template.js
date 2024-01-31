var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createName } from "../services/createFile.service.js";
export const capitalize = (name) => name.charAt(0).toLowerCase() + name.slice(1, name.length + 1);
export const tsxTemplate = (n, defaultExport, withCva) => __awaiter(void 0, void 0, void 0, function* () {
    const name = yield createName(n, 'cc');
    return `import React, { FC } from 'react';
${withCva ? `import { cva${name} } from './${n}${n.includes('-') ? '-s' : 'S'}tyles.ts';` : "import { cva } from 'class-variance-authority';"}

interface ${name}Props {
  className?: string;
}
${withCva ? '' :
        `const cva${name} = cva([
  '${name}-cvaRoot',
  '',
], {
  variants: {},
  defaultVariants: {},
});

`}
${!defaultExport ? `export ` : ''}const ${name}: FC<${name}Props> = ({}) => {
  return (
    <div className={cva${name}()}></div>
  );
};

${defaultExport ? `export default ${name}` : ''}
`;
});
export const typesTemplate = (name) => `export interface I${name} {

}
`;
export const styleTemplate = (name) => `import { cva } from 'class-variance-authority';

const cva${name} = cva([
  '${name}-cvaRoot',
  '',
], {
  variants: {},
  defaultVariants: {},
});

export {
  cva${name},
}
`;
export const dataTemplate = (name) => `export const data${name} = {

}
`;
export const hooksTemplate = (name, defaultExport) => `import { useEffect, useState } from 'react';

${!defaultExport ? `export ` : ''}const use${name} = () => {
  
}
${defaultExport ? `export default ${name}` : ''}
`;
