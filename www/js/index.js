/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var cantOp = 1;
function addIng() {
	cantOp++;
	var ings = document.getElementsByClassName("ingredientes")[0];
	var ing = document.getElementsByClassName("ingrediente")[0];
	var btn = document.getElementById("addIngBtn");
	//ing.innerHTML += "<ng-input theme='hoshi' label='Ingrediente 1' ng-required='1' ng-minlength=3 ng-model='dato.ingrediente' name='ingrediente' ></ng-input>";
	var cln = ing.cloneNode(true);
	clnInp = cln.getElementsByTagName("input");
	clnSpn = cln.getElementsByTagName("span");
	clnLbl = cln.getElementsByTagName("label");
	clnInp[0].setAttribute("name", "ingrediente"+cantOp);
	clnInp[1].setAttribute("name", "cantidad"+cantOp);
	clnLbl[0].setAttribute("data-content", "Ingrediente "+cantOp);
	clnLbl[0].getElementsByTagName("span")[0].setAttribute("data-content", "Ingrediente "+cantOp);
	clnLbl[0].getElementsByTagName("span")[0].innerHTML = "Ingrediente "+cantOp;
	//clnSpn[0].setAttribute("ng-model", "dato.ingredientes["+(cantOp-1)+"].ingrediente");
	clnSpn[0].setAttribute("name", "ingrediente"+cantOp);
	clnSpn[0].setAttribute("label", "Ingrediente "+cantOp);
	//clnSpn[1].setAttribute("name", "cantidad"+cantOp);
	ings.insertBefore(cln, btn);
	//ings.appendChild(cln);
	
}

function addIns() {
	var ings = document.getElementsByClassName("instrucciones")[0];
	var ing = document.getElementsByClassName("instruccion")[0];
	var btn = document.getElementById("addInsBtn");
	//ing.innerHTML += "<ng-input theme='hoshi' label='Ingrediente 1' ng-required='1' ng-minlength=3 ng-model='dato.ingrediente' name='ingrediente' ></ng-input>";
	var cln = ing.cloneNode(true);
	/*
	clnInp = cln.getElementsByTagName("input");
	clnSpn = cln.getElementsByTagName("span");
	clnLbl = cln.getElementsByTagName("label");
	clnInp[0].setAttribute("name", "ingrediente"+cantOp);
	clnInp[1].setAttribute("name", "cantidad"+cantOp);
	clnLbl[0].setAttribute("data-content", "Ingrediente "+cantOp);
	clnLbl[0].getElementsByTagName("span")[0].setAttribute("data-content", "Ingrediente "+cantOp);
	clnLbl[0].getElementsByTagName("span")[0].innerHTML = "Ingrediente "+cantOp;
	clnSpn[0].setAttribute("ng-model", "dato.ingrediente");
	clnSpn[0].setAttribute("name", "ingrediente"+cantOp);
	clnSpn[0].setAttribute("label", "Ingrediente "+cantOp);
	*/
	//clnSpn[1].setAttribute("name", "cantidad"+cantOp);
	ings.insertBefore(cln, btn);
	//ings.appendChild(cln);
}
/*
var modoOff = false;
var serverUrl = "http://schedular.atwebpages.com/php/";
var btnToggle = document.getElementById("modo");
var estado = document.createElement("p");
estado.innerHTML = "NO"
btnToggle.appendChild(estado);

btnToggle.onclick= function(){
	if(modoOff)
	{
		modoOff = false;
		estado.innerHTML = "NO"
	}
	else
	{
		modoOff = true;
		estado.innerHTML = "SI"
	}
}


if(modoOff)
{
	serverUrl = "archivos_en_el_servidor/php/";
}
else
{
	serverUrl = "http://schedular.atwebpages.com/php/";
}
*/