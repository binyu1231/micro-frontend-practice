import {declareChildApplication, start} from 'single-spa';
import 'babel-polyfill';

declareChildApplication('navbar', () => import('./navbar/navbar.app.js'), () => true);
declareChildApplication('home', () => import('./home/home.app.js'), () => location.pathname === "" || location.pathname === "/");
declareChildApplication('react', () => import('./react/react.app.js'), pathPrefix('/react'));
declareChildApplication('angular', () => import('./angular/angular.app.js'), pathPrefix('/angular'));
declareChildApplication('vue', () => import('src/vue/vue.app.js'), pathPrefix('/vue'));

start();

function pathPrefix(prefix) {
    return function(location) {
        return location.pathname.indexOf(`${prefix}`) === 0;
    }
}
