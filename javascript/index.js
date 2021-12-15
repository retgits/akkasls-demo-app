import { AkkaServerless } from "@lightbend/akkaserverless-javascript-sdk";
import entity from './cart.js';
import view from './view.js';

const server = new AkkaServerless();
server.addComponent(entity);
server.addComponent(view);
server.start({address:'0.0.0.0', port:'8080'});