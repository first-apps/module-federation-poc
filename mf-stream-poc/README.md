# Stream

A video streaming app based on micro frontend architecture

## Table of contents

- [Documentation](#documentation)
  - [Design Inspiration](#design-inspiration)
  - [CSS](#css)
  - [Components](#components)

### Documentation

#### Design Inspiration

![UI design](https://github.com/user-attachments/assets/252832b4-0c88-447c-94f3-879d4280a64c)

#### CSS

- TailwindCSS is used in all the micro frontend repositories
- CSS in micro frontends are independent of each other. Any CSS used in a micro frontend will be built, minified and purged then will be eported to the other micro frontend

#### Components

- Components are globally created in the mf-stream-components, used in all the mf-stream repos
