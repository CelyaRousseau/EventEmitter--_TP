/*EventEmitter() : fonction principale  
* Graçe au design pattern Factory, celle ci va creer toute seule un object et nous le renvoyer
* Ensuite graçe à la mise en place du design pattern chaining, directement à partir de cette fonction 
* on va pouvoir appeller diretement les fonctions de notre objet à la chaîne
*/
function EventEmitter(){    //EventEmitter() : Fonction principale
  var EventEmitter ={       //Création de notre objet
    timer: 100,             //On lui ajoute les attributs timer et callbacks
    callbacks : {}, 
    //hashMap [ event -> [fn1, fn2,...] ] hashmap = bonjour 
    
    // Implémentation des fonctions de l'objet EventEmitter
    // Implémentation de .on()
     on: function(event, fn){
            if (!this.callbacks.hasOwnProperty(event)) { // Si l'evenement n'existe pas déjà on le crée et lui ajoute sa fonction
                this.callbacks[event] = [];
                this.callbacks[event].push(fn);
                return this; // On retourne l'objet mis à jour (Important! pour la mise en place du chaining)
            }
            else { // Sinon on lui ajoute simplement la fonction passé en paramètre et on retourne l'objet
                this.callbacks[event].push(fn);
                return this;
            }
        },
        
        // Implémentation de .off() 
        off: function(event, fn){
            if (!event && !fn) { // Si on ne passe pas d'arguments à la fonction, celle ci supprime TOUS les évenements est les fonction associées à l'objet
                this.callbacks = {};
                return this;
            }
            else if (event && fn) { // Sinon si on nous met un evenement et une fonction en paramètre on ne supprime que l'a fonction 
                var fn = this.callbacks[event];          
                fn.splice(event.indexOf[fn]);
                return this;
            }
            else if (!fn) {
                delete this.callbacks[event]; // si on ne passe qu'un evenement en paramètre, on supprime l'évènement et ses fonctions
                return this;
            }
        },
        
        // Implémentation de .emit()
        emit: function(event /*,args */) {
            var args = Array.prototype.slice.call(arguments); //On crée un tableau auquel on insère les arguments par notre fonction
            args.shift(); // On supprime la première colonne du tableau, ici celle qui contient l'évenement
            if (this.callbacks.hasOwnProperty(event) && (this.timer > 0)) { //Si on a passé un argument 'event' à la fonction et que notre le timer de l'objet est supérieur à 0, Pour chaque Evénement on appelle sa fonction
                this.callbacks[event].forEach(function(f) {
                    f.apply(this, args);

                    return this;
                });
                --this.timer; // On décrémente notre timer
                return this; // On retourne l'objet mis à jour
            }
           
        },
        
        // Implémentation de .once()
        once: function(event, fn /*,args */) {       // La fonction .once() assigne un compteur égale à 1 à notre objet, et par conséquent ne permet à l'objet que d'être appelé une seule fois   
                this.timer = 1;               
                this.on(event,fn /*,args */); // On appelle la fonction .on() afin d'ajouter l'evenement et sa fonction à l'objet                     
                return this; 
        },

          // Implémentation de .times()
        times: function(event, timer, fn){         //La fonction .times est similaire à la fonction .on(), sa seule différence réside dans le fait que l'utilisateur choisit lui même à combien est égale le compteur 
                this.timer = timer;
                if( this.timer >0){
                this.on(event,fn);        
                return this;
            }
        } 
    };
    return EventEmitter; //On retourne l'object ! (Très important pour le Factory mais aussi le Chaining)
  };
  
var fn=console.log.bind(console);

EventEmitter().on("event1",	fn)
		.on("event2",	fn)
		.emit("event1",	1).emit("event2",	2)
		.off("event1",	fn)
		.emit("event1",	1).emit("event2",	2);
        
EventEmitter().once("event",function(){console.log("Should only be	printed	once");})
		.emit("event")
		.emit("event");

EventEmitter().times("event3",  2,  fn)
        .emit("event3", "hello  should  be  print")
        .emit("event3", "world  should  be  print")
        .emit("event3", "SHOULD NOT BE  PRINTED");        
        
        

