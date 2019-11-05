import { configure } from '@storybook/react'
import { configure as htmlConfigure } from '@storybook/html'
import './global-style.css'

configure(require.context('../storybook', true, /\.stories\.js$/), module)
htmlConfigure(require.context('../storybook', true, /\.html-stories\.js$/), module)