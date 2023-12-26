import { MyApp } from './MyApp.js';
import { MyGuiInterface } from './MyGuiInterface.js';
import { MyContents } from './MyContents.js';

import * as THREE from 'three';

// create the application object
let app = new MyApp()
// initializes the application
app.init()

// create the contents object
let contents = new MyContents(app)
// initializes the contents
contents.init()
// hooks the contents object in the application object
app.setContents(contents);

// moved gui to contents

// main animation loop - calls every 50-60 ms.
app.render()