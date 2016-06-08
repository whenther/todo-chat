import angular = require('angular');

import todoChat from './todo-chat/todo-chat';

const module = angular.module('app.components', [
]);

module.component('todoChat', todoChat);

export default module.name;