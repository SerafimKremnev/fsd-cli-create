# fsd-cli-create

Это NPM пакет, предоставляющий интерфейс командной строки для управления создания компонентов в FSD.

## Установка

Для использования этого пакета, установите его глобально через NPM:
```bash
npm install -g fsd-cli-create
```

Помощь 
```bash
fsd -h 
```

## Настройка конфига

**Установка стиля наименования (по умолчанию CamelCase)**

```bash
fsd set-style сс
```
Принимает параметры cc и kc (CamelCase kebab-case)

**Установка названия файла (по умолчанию component)**

```bash
fsd set-filename component
```
Принимает параметры component и index

**Установка экспорта (по умолчанию const)**

```bash
fsd set-style const
```
Принимает параметры default и const


## Использование

**Без параметров**

```bash
fsd example-component-name
```
Создаст компонент в папке features

**Параметр папки**

```bash
fsd example-component-name -w
```
- Создаст компонент в папке widgets 
- Принимает -f -w -e

**Параметр фич**
```bash
fsd example-component-name -add hc
```
- создаст data
- создаст hooks

Принимает строку и если имеется в слове: 
- t - создаст types
- h - создаст hooks
- d - создаст data
- c - создаст в ui cva стили

**Другое**

```bash
fsd -h
```
Выводит все команды

```bash
fsd config
```
Выводит текущую конфигурацию

## Примеры

```bash
fsd test-component -w -add thdc
```
Эта команда создаст такие файлы:

/widgets/TestComponent
- /ui/TestComponent.tsx
- /ui/TestComponentStyles.tsx
- /hooks/useTestComponent.ts
- /types/typeTestComponent.ts
- /data/mockTestComponent.ts


**/ui/TestComponent.tsx**
```ts
import React, { FC } from 'react';
import { cvaTestComponent } from './TestComponentStyles.ts';

interface TestComponentProps {
  className?: string;
}

export const TestComponent: FC<TestComponentProps> = ({}) => {
  return (
    <div className={cvaTestComponent()}></div>
  );
};
```

**/ui/TestComponentStyles.ts**
```ts
import { cva } from 'class-variance-authority';

const cvaTestComponent = cva([
  'TestComponent-cvaRoot',
  '',
], {
  variants: {},
  defaultVariants: {},
});

export {
  cvaTestComponent,
}
```

**/hooks/useTestComponent.ts**
```ts
import { useEffect, useState } from 'react';

export const useTestComponent = () => {
  
}
```

**/types/typesTestComponent.tsx**
```ts
export interface ITestComponent {

}
```

**/data/mockTestComponent.tsx**
```ts
export const dataTestComponent = {

}
```