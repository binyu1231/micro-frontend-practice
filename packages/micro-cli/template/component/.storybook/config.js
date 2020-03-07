import { configure } from '@storybook/react'
// import './global-style.css'

configure(require.context('../storybook', true, /\.stories\.js$/), module)