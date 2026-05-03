# **L'Enginyeria de Programari amb TypeScript: Un Tractat sobre la Qualitat, l'Arquitectura de Tipus i la Gestió de Complexitat en l'Ecosistema JavaScript**

La transformació de JavaScript d'un llenguatge de scripts per a la manipulació d'elements del DOM en un entorn de desenvolupament per a sistemes de missió crítica ha estat acompanyada d'un augment exponencial en la complexitat de les aplicacions. En aquest context, TypeScript no emergeix merament com un transpilador, sinó com una eina d'enginyeria fonamental que tanca la bretxa entre les capacitats dinàmiques originals del llenguatge i les necessitats d'una arquitectura de programari robusta, predictible i escalable.1 L'adopció de TypeScript representa un compromís amb la qualitat del codi que transcendeix la simple correcció sintàctica per entrar en l'àmbit de la verificació formal i la documentació integrada.3

## **Fonaments de la Millora de la Qualitat: El Canvi de Paradigma cap al Tipat Estàtic**

La millora de la qualitat que TypeScript aporta a un projecte es fonamenta en la transició d'un sistema de validació en temps d'execució cap a una comprovació de tipus estàtica. En el model tradicional de JavaScript pur, la naturalesa dinàmica del llenguatge implica que els errors de tipus sovint romanen latents fins que el codi s'executa en l'entorn de producció.3 TypeScript inverteix aquesta dinàmica mitjançant la introducció d'un pas de compilació que actua com un verificador estàtic, assegurant que les relacions entre les unitats de codi siguin coherents abans que es produeixi qualsevol execució.2  
Aquesta capacitat de detectar errors durant la fase de desenvolupament és el que sovint es descriu com una "anotació de tipus com a teorema i el cos de la funció com a prova".1 Quan un desenvolupador defineix un tipus per a un paràmetre de funció, està establint una condició formal que el sistema ha de satisfer. El compilador, en verificar que la implementació s'ajusta a aquestes restriccions, proporciona una garantia matemàtica sobre el flux de dades que redueix dràsticament la càrrega cognitiva de l'equip de desenvolupament.1

| Dimensió de Qualitat | Impacte de TypeScript | Mecanisme Tècnic |
| :---- | :---- | :---- |
| Predicibilitat | Reducció d'efectes secundaris inesperats. | Sistema de tipus estructural i anàlisi de flux de control.3 |
| Mantenibilitat | Facilitat per refactoritzar grans bases de codi. | Els errors de tipus es propaguen immediatament a tota l'aplicació.2 |
| Documentació | Els tipus serveixen com a especificació autoverificable. | La informació de tipus està integrada en la implementació, no separada.1 |
| Tooling | Experiència de desenvolupament enriquida (IDE). | Autocompletat basat en la introspecció de tipus i navegació precisa.2 |

L'arquitectura del sistema de tipus de TypeScript permet prevenir els anomenats "errors de tipus", que constitueixen la major part dels problemes en programació: des de simples errors tipogràfics fins a la incomprensió profunda de la superfície de l'API d'una llibreria o assumpcions incorrectes sobre el comportament dels objectes en temps d'execució.3 Mitjançant l'ús de TypeScript, les relacions entre diferents mòduls i unitats de codi s'expressen amb una claredat que JavaScript, tot i haver crescut en l'àmbit d'aplicació, no ha pogut oferir de manera nativa.3

## **L'Arquitectura de la Configuració: Decisions Estratègiques al tsconfig.json**

El fitxer tsconfig.json no és només un llistat de preferències del compilador; és el document que defineix l'estratègia d'enginyeria d'un projecte. La seva presència marca el directori com l'arrel d'un projecte TypeScript i configura el comportament d'un compilador que s'ha de moure en un espectre que va des de la permissivitat de JavaScript fins a la rigidesa dels llenguatges fortament tipats.4

### **Gestió de l'Abast i l'Herència del Projecte**

Les decisions inicials d'un arquitecte de programari en configurar TypeScript se centren en la delimitació del projecte. Les propietats d'arrel com files, include i exclude determinen exactament quins fitxers formen part del programa que el compilador analitzarà.5  
L'opció include s'ha convertit en l'estàndard industrial per a projectes moderns, permetent l'ús de patrons "glob" (com src/\*\*/\*) per capturar de manera dinàmica tots els fitxers de codi font.5 En contraposició, l'opció files s'utilitza en escenaris on es requereix un control manual i absolut sobre els fitxers, ideal per a projectes molt petits o casos on la inclusió automàtica podria introduir ambigüitats.5 La propietat exclude, d'altra banda, és una eina de filtratge essencial per ometre directoris com node\_modules o resultats de compilació, tot i que cal tenir en compte que un fitxer exclòs pot acabar formant part de la compilació si és importat explícitament per un fitxer inclòs.5  
Una decisió clau en grans organitzacions és l'ús de la propietat extends. Aquesta funcionalitat permet que els equips defineixin una base de configuració compartida —sovint publicada com a paquet npm com @tsconfig/node20— per assegurar la coherència entre desenes o centenars de microserveis o mòduls.4 L'herència de configuracions garanteix que els estàndards de qualitat, com les regles d'estrictezza, es mantinguin uniformes en tot l'ecosistema de l'empresa.5

### **Opcions del Compilador: Entre la Compatibilitat i el Rigor**

Dins de compilerOptions, les decisions es divideixen principalment en tres categories: l'entorn d'execució (target), el sistema de mòduls i el nivell de rigor de la comprovació de tipus.5

| Opció Clau | Propòsit Arquitectònic | Recomanació d'Expert |
| :---- | :---- | :---- |
| target | Defineix la versió de JavaScript de sortida (ES5, ES2022, ESNext). | Triar la versió més moderna suportada per l'entorn d'execució per minimitzar polyfills.6 |
| module | Controla la generació de codi per a sistemes de mòduls (CommonJS, ESM). | NodeNext per a Node.js modern, o Preserve si s'utilitza un bundler com Vite o Webpack.6 |
| strict | Flag que activa tota la família de comprovacions de rigor. | Sempre true per a nous projectes per garantir la màxima seguretat de tipus.5 |
| noImplicitAny | Prohibeix la inferència de tipus al valor any per defecte. | Activar-lo per evitar "forats" en la xarxa de seguretat del compilador.5 |
| strictNullChecks | Separa null i undefined de la resta de tipus. | Vital per prevenir l'error "undefined is not a function".5 |
| allowJs i checkJs | Integració amb codi JavaScript pur. | Activar-los durant fases de migració o en projectes híbrids.9 |

L'activació de strict és, sens dubte, la decisió més transcendent. Aquesta flag no només activa noImplicitAny i strictNullChecks, sinó que també inclou opcions com useUnknownInCatchVariables i strictPropertyInitialization.5 Optar per un model estricte des de l'inici del cicle de vida del projecte evita l'acumulació de deute tècnic i garanteix que el codi segueixi les millors pràctiques de seguretat de tipus des de la primera línia.5  
D'altra banda, la configuració d'outDir i rootDir és essencial per gestionar l'estructura de la compilació. Mentre que rootDir indica al compilador la font de la veritat del projecte, outDir especifica on s'ha de dipositar el codi JavaScript transpilat, mantenint una separació clara entre el codi font i els artefactes de producció.7

## **Contractes de Dades: El Poder de les Interfícies i la Tipologia Estructural**

Un dels conceptes més potents de TypeScript és que la comprovació de tipus es centra en la "forma" que tenen els valors. Aquest enfocament, conegut com a "duck typing" o subtipejat estructural, permet definir contractes de dades sense necessitat de relacions nominals rígides entre classes.12 Les interfícies (interface) i els alias de tipus (type) són els mecanismes principals per codificar aquests contractes.13

### **Definició d'Objectes i Propietats Opcionalitzades**

Les interfícies permeten nomenar un tipus d'objecte i definir-ne les regles d'ús. Una característica fonamental és la capacitat de definir propietats opcionals mitjançant l'operador ?. Això és especialment útil en patrons de disseny com els "option bags", on una funció pot acceptar un objecte de configuració amb múltiples paràmetres, però només uns pocs són estrictament necessaris per a cada crida.12  
A més de l'opcionalitat, les interfícies permeten definir propietats de només lectura (readonly). Aquest modificador és una eina de disseny que comunica la intenció que un objecte no s'ha de modificar després de la seva inicialització, protegint la immutabilitat en temps de compilació, tot i que desapareix en temps d'execució.12

### **La Dualitat: Interface vs. Type Alias**

Tot i que en molts casos són intercanviables, la tria entre interface i type implica matisos arquitectònics importants. Les interfícies s'inspiren en els principis de l'orientació a objectes i són inherentment extensibles.13

| Característica | Interface | Type Alias |
| :---- | :---- | :---- |
| Mecanisme d'Extensió | Utilitza la paraula clau extends. | Utilitza la intersecció de tipus amb l'operador &.13 |
| Merging de Declaracions | Permès: múltiples declaracions amb el mateix nom es fusionen automàticament. | Prohibit: declara un error d'identificador duplicat.13 |
| Capacitats Union | No pot expressar unions directament. | Pot representar unions (string | number) i tipus primitius.13 |
| Rendiment del Compilador | Millor rendiment en l'anàlisi gràcies al catàleg intern per nom. | Pot ser lleugerament més lent en computar interseccions complexes.13 |
| Ús recomanat | Per a formes d'objectes públiques i herència de classes. | Per a unions, tuples, i definicions de tipus funcionals.13 |

L'anomenat "declaration merging" és una propietat exclusiva de les interfícies que permet a les llibreries i als usuaris augmentar interfícies existents simplement declarant-les de nou en el mateix àmbit.15 Aquesta capacitat és la que permet que TypeScript pugui descriure objectes globals com window o document, que sovint són ampliats per diferents biblioteques de tercers de manera concurrent.15 Per contra, els alias de tipus són els preferits quan es requereixen operacions més funcionals, com la creació de tipus a partir d'unions de literals o la definició de tipus computats complexos.16

## **Genèrics: Abstracció sense Pèrdua de Fidelitat de Tipus**

En el desenvolupament de components reutilitzables —com funcions d'utilitat, contenidors de dades o components de React—, sovint ens trobem amb la necessitat de crear lògica que funcioni amb diversos tipus. Sense els genèrics, ens veuríem obligats a utilitzar any, cosa que destruiria la xarxa de seguretat de TypeScript, o a duplicar codi per a cada tipus possible.18  
Els genèrics resolen aquest problema permetent que una funció o classe capturi el tipus que l'usuari li proporciona mitjançant una variable de tipus (sovint denotada com T o Type).18 L'exemple clàssic és la funció d'identitat: identity\<T\>(arg: T): T. En aquesta declaració, TypeScript estableix un contracte que garanteix que el tipus que entra és exactament el mateix que surt.18

### **Restriccions i Operadors de Tipus**

L'ús de genèrics esdevé realment potent quan s'apliquen restriccions (constraints) mitjançant la paraula clau extends. Per exemple, podem restringir un genèric perquè només accepti objectes que tinguin una propietat length o perquè una clau d'accés pertanyi realment a un objecte utilitzant K extends keyof T.18  
Aquesta tècnica és essencial per a l'enginyeria de components React, on un component genèric pot acceptar una llista d'elements de qualsevol tipus, però requerir que cada element tingui un identificador únic per al renderitzat.19 Els genèrics permeten que el compilador verifiqui la correcció d'aquestes relacions sense comprometre la flexibilitat del component.18

## **Interoperabilitat: El Pont entre TypeScript i l'Univers JavaScript**

La integració de TypeScript en projectes que depenen de llibreries JavaScript sense tipat és un dels pilars de la seva adopció massiva. Aquesta interoperabilitat es gestiona mitjançant els fitxers de declaració (.d.ts), que proporcionen metadades sobre la forma del codi JavaScript sense incloure-hi lògica executable.21

### **DefinitelyTyped i l'Ecosistema @types**

DefinitelyTyped és el repositori comunitari més gran del món per a definicions de tipus, actuant com una "pedra Rosetta" que tradueix milers de paquets JavaScript a un llenguatge comprensible per al compilador de TypeScript.21

1. **Consum Automàtic**: Quan s'instal·la un paquet com lodash, l'equip sol instal·lar també @types/lodash com a dependència de desenvolupament. TypeScript utilitza automàticament aquestes definicions per proporcionar autocompletat i validació.23  
2. **Tipus Empaquetats**: Una tendència creixent és que els autors de llibreries incloguin directament els fitxers .d.ts en el seu propi paquet de npm, cosa que elimina la necessitat de recórrer a DefinitelyTyped i garanteix que els tipus estiguin sempre sincronitzats amb la versió del codi.21  
3. **Declaracions Manuals**: En el cas d'utilitzar una llibreria interna o molt antiga que no disposa de tipus, els desenvolupadors poden crear un fitxer de declaració manual utilitzant declare module "nom-modul". Això permet importar la llibreria com a any per poder continuar el desenvolupament sense errors de compilació, tot i que es perd la seguretat de tipus per a aquest mòdul específic.21

### **Migració Incremental: allowJs i checkJs**

TypeScript no exigeix una conversió total des del primer dia. Mitjançant les flags allowJs i checkJs, el compilador pot processar fitxers JavaScript dins del projecte TypeScript.9 allowJs permet que el compilador consumeixi fitxers .js com a mòduls vàlids, mentre que checkJs permet que el motor de tipus de TypeScript apliqui la seva anàlisi fins i tot a fitxers JavaScript purs, sovint utilitzant comentaris JSDoc per inferir la intenció del programador.10

## **Programació Asíncrona i Gestió de Promeses**

L'asincronia és una part integral de JavaScript modern, i TypeScript ofereix un suport de primer nivell per tipar Promises i l'ús de async/await. Una funció marcada amb async sempre retorna una Promise\<T\>, fins i tot si la implementació sembla retornar un valor directe; el compilador s'encarrega d'envoltar el resultat en una promesa resolta.27

### **El Tipat de la Resolució Asíncrona**

El gran benefici de TypeScript en aquest àmbit és la capacitat de definir exactament què retornarà una crida asíncrona. Per exemple, una crida a una API pot ser tipada com Promise\<User\>. Quan s'utilitza l'operador await, TypeScript "desenvolupa" automàticament la promesa, assignant a la variable resultant el tipus User.27  
L'aparició de l'utilitat Awaited\<T\> en les versions recents ha simplificat enormement el tipat de funcions que retornen promeses niades o estructures asíncronas complexes, simulant de manera recursiva la manera en què await o el mètode .then() funcionen en temps d'execució.30 Això és crucial per mantenir la coherència de tipus en llargues cadenes de processament de dades asíncrones.

## **Utilitats de Tipus: El Principi DRY Aplicat al Sistema de Tipus**

TypeScript proporciona una sèrie d'utilitats globals que permeten transformar tipus existents en formes noves sense duplicar la informació de veritat del projecte.19

| Utilitat | Mecanisme | Aplicació Pràctica |
| :---- | :---- | :---- |
| Pick\<T, K\> | Extreu només les claus K del tipus T. | Crear un resum d'un objecte d'usuari només amb id i nom.19 |
| Omit\<T, K\> | Crea un tipus eliminant les claus K de T. | Enviar un objecte a una base de dades sense el camp id autogenerat.31 |
| Partial\<T\> | Transforma totes les propietats en opcionals. | Per a funcions d'actualització on només s'envien alguns camps.19 |
| ReturnType\<T\> | Obté el tipus de retorn d'una funció. | Extreure el tipus de dades d'una funció d'API de tercers per reutilitzar-lo.30 |
| Record\<K, T\> | Crea un diccionari amb claus K i valors T. | Definir mapes de configuració o catàlegs de dades.30 |

Aquestes utilitats són essencials per mantenir una base de codi neta. Per exemple, en lloc de definir manualment una interfície per a la creació d'un element i una altra per a la seva actualització, podem definir l'entitat base User i utilitzar Omit\<User, "id"\> per a la creació i Partial\<User\> per a l'actualització. Això assegura que si s'afegeix un camp nou a User, totes les operacions relacionades s'actualitzin automàticament pel compilador.19

## **Gestió Robusta d'Errors: Del any al unknown**

Històricament, les variables de captura en els blocs catch de TypeScript eren per defecte de tipus any. Això suposava un risc de seguretat, ja que el programador podia intentar accedir a error.message sense saber si el que s'havia llançat era realment un objecte Error o qualsevol altra cosa (com un número o un null).33

### **El Paradigma de la Comprovació Obligatòria**

Amb la introducció del tipus unknown per a les variables de captura (flag useUnknownInCatchVariables), TypeScript obliga ara a una gestió molt més responsable dels errors.33

1. **Seguretat en l'accés**: El tipus unknown impedeix qualsevol operació sobre la variable fins que se'n verifiqui el tipus real.34  
2. **Narrowing**: El desenvolupador ha d'utilitzar guardes de tipus, com if (error instanceof Error), per permetre que TypeScript "estrenyi" (narrow) el tipus i permeti l'accés a propietats com .message o .stack.34  
3. **Resiliència**: Aquest enfocament garanteix que el codi de gestió d'errors no provoqui ell mateix un error en temps d'execució en intentar processar un valor inesperat.34

## **Síntesi d'Enginyeria i Perspectives de Futur**

L'estudi integral de TypeScript en l'entorn de programari modern demostra que la seva aportació va molt més enllà de la simple correcció de bugs. Proporciona una infraestructura de comunicació per als equips, on els tipus actuen com un llenguatge compartit que descriu la intenció i el disseny del sistema.1 L'habilitat per configurar el compilador mitjançant el tsconfig.json permet que les organitzacions trobin l'equilibri perfecte entre la velocitat de desenvolupament i la seguretat del producte final.4  
A mesura que l'ecosistema JavaScript continua evolucionant, TypeScript es posiciona com el guardià de la integritat del codi. Des de la gestió de contractes de dades complexos amb interfícies i unions, fins a l'abstracció polimòrfica amb genèrics i el control rigorós d'errors asíncrons, TypeScript ofereix les eines necessàries per construir sistemes que no només funcionen, sinó que són fàcils d'entendre, mantenir i fer créixer en el temps.2 L'aposta per TypeScript és, en essència, una aposta per l'excel·lència en l'enginyeria de programari.

#### **Obras citadas**

1. TypeScript : More than just another JS transpiler \- Basarat Ali Syed \- YouTube, fecha de acceso: mayo 3, 2026, [https://www.youtube.com/watch?v=wuPSYRi7Pt8](https://www.youtube.com/watch?v=wuPSYRi7Pt8)  
2. What is TypeScript and why should I use it instead of JavaScript? \[closed\] \- Stack Overflow, fecha de acceso: mayo 3, 2026, [https://stackoverflow.com/questions/12694530/what-is-typescript-and-why-should-i-use-it-instead-of-javascript](https://stackoverflow.com/questions/12694530/what-is-typescript-and-why-should-i-use-it-instead-of-javascript)  
3. Handbook \- The TypeScript Handbook \- TypeScript, fecha de acceso: mayo 3, 2026, [https://www.typescriptlang.org/docs/handbook/intro.html](https://www.typescriptlang.org/docs/handbook/intro.html)  
4. Documentation \- What is a tsconfig.json \- TypeScript, fecha de acceso: mayo 3, 2026, [https://www.typescriptlang.org/docs/handbook/tsconfig-json.html](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)  
5. TSConfig Reference \- Docs on every TSConfig option \- TypeScript, fecha de acceso: mayo 3, 2026, [https://www.typescriptlang.org/tsconfig/](https://www.typescriptlang.org/tsconfig/)  
6. How to Configure tsconfig.json Properly \- OneUptime, fecha de acceso: mayo 3, 2026, [https://oneuptime.com/blog/post/2026-01-24-typescript-tsconfig-configuration/view](https://oneuptime.com/blog/post/2026-01-24-typescript-tsconfig-configuration/view)  
7. TypeScript \- tsconfig.json \- TutorialsPoint, fecha de acceso: mayo 3, 2026, [https://www.tutorialspoint.com/typescript/typescript\_tsconfig\_json.htm](https://www.tutorialspoint.com/typescript/typescript_tsconfig_json.htm)  
8. A guide to \`tsconfig.json\` \- 2ality, fecha de acceso: mayo 3, 2026, [https://2ality.com/2025/01/tsconfig-json.html](https://2ality.com/2025/01/tsconfig-json.html)  
9. TSConfig Option: checkJs \- TypeScript, fecha de acceso: mayo 3, 2026, [https://www.typescriptlang.org/tsconfig/checkJs.html](https://www.typescriptlang.org/tsconfig/checkJs.html)  
10. Using TypeScript to Check Your JavaScript Code | The WebStorm Blog, fecha de acceso: mayo 3, 2026, [https://blog.jetbrains.com/webstorm/2019/09/using-typescript-to-check-your-javascript-code/](https://blog.jetbrains.com/webstorm/2019/09/using-typescript-to-check-your-javascript-code/)  
11. Documentation \- Migrating from JavaScript \- TypeScript, fecha de acceso: mayo 3, 2026, [https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)  
12. Handbook \- Interfaces \- TypeScript, fecha de acceso: mayo 3, 2026, [https://www.typescriptlang.org/docs/handbook/interfaces.html](https://www.typescriptlang.org/docs/handbook/interfaces.html)  
13. Type vs Interface: Which Should You Use? \- Total TypeScript, fecha de acceso: mayo 3, 2026, [https://www.totaltypescript.com/type-vs-interface-which-should-you-use](https://www.totaltypescript.com/type-vs-interface-which-should-you-use)  
14. Documentation \- Object Types \- TypeScript, fecha de acceso: mayo 3, 2026, [https://www.typescriptlang.org/docs/handbook/2/objects.html](https://www.typescriptlang.org/docs/handbook/2/objects.html)  
15. Interfaces vs Types in TypeScript: The Definitive Guide for Modern Developers \- Medium, fecha de acceso: mayo 3, 2026, [https://medium.com/devglyph/interfaces-vs-types-in-typescript-the-definitive-guide-for-modern-developers-abbaad1a0d36](https://medium.com/devglyph/interfaces-vs-types-in-typescript-the-definitive-guide-for-modern-developers-abbaad1a0d36)  
16. Types vs. interfaces in TypeScript \- LogRocket Blog, fecha de acceso: mayo 3, 2026, [https://blog.logrocket.com/types-vs-interfaces-typescript/](https://blog.logrocket.com/types-vs-interfaces-typescript/)  
17. Interfaces | TypeScript Deep Dive \- GitBook, fecha de acceso: mayo 3, 2026, [https://basarat.gitbook.io/typescript/type-system/interfaces](https://basarat.gitbook.io/typescript/type-system/interfaces)  
18. Documentation \- Generics \- TypeScript, fecha de acceso: mayo 3, 2026, [https://www.typescriptlang.org/docs/handbook/2/generics.html](https://www.typescriptlang.org/docs/handbook/2/generics.html)  
19. TypeScript Utility Types: Pick, Omit, Partial, and More | by Frontend Highlights | Medium, fecha de acceso: mayo 3, 2026, [https://medium.com/@ignatovich.dm/typescript-utility-types-pick-omit-partial-and-more-ae2a46f020a5](https://medium.com/@ignatovich.dm/typescript-utility-types-pick-omit-partial-and-more-ae2a46f020a5)  
20. Documentation \- More on Functions \- TypeScript, fecha de acceso: mayo 3, 2026, [https://www.typescriptlang.org/docs/handbook/2/functions.html\#declaring-this-in-a-function](https://www.typescriptlang.org/docs/handbook/2/functions.html#declaring-this-in-a-function)  
21. Documentation \- Type Declarations \- TypeScript, fecha de acceso: mayo 3, 2026, [https://www.typescriptlang.org/docs/handbook/2/type-declarations.html](https://www.typescriptlang.org/docs/handbook/2/type-declarations.html)  
22. Understanding .d.ts in TypeScript: The Secret Ingredient for Typing JavaScript Like a Pro, fecha de acceso: mayo 3, 2026, [https://blog.devgenius.io/understanding-d-ts-in-typescript-the-secret-ingredient-for-typing-javascript-like-a-pro-b58a73e5afee](https://blog.devgenius.io/understanding-d-ts-in-typescript-the-secret-ingredient-for-typing-javascript-like-a-pro-b58a73e5afee)  
23. GitHub \- DefinitelyTyped/DefinitelyTyped: The repository for high ..., fecha de acceso: mayo 3, 2026, [https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)  
24. Using Javascript Library in Typescript \- Reddit, fecha de acceso: mayo 3, 2026, [https://www.reddit.com/r/typescript/comments/60hkna/using\_javascript\_library\_in\_typescript/](https://www.reddit.com/r/typescript/comments/60hkna/using_javascript_library_in_typescript/)  
25. Symbiotic Definitely Typed | johnnyreilly, fecha de acceso: mayo 3, 2026, [https://johnnyreilly.com/symbiotic-definitely-typed](https://johnnyreilly.com/symbiotic-definitely-typed)  
26. TSConfig Option: allowJs \- TypeScript, fecha de acceso: mayo 3, 2026, [https://www.typescriptlang.org/tsconfig/allowJs.html](https://www.typescriptlang.org/tsconfig/allowJs.html)  
27. A guide to async/await in TypeScript \- LogRocket Blog, fecha de acceso: mayo 3, 2026, [https://blog.logrocket.com/async-await-typescript/](https://blog.logrocket.com/async-await-typescript/)  
28. Learn Async Programming in TypeScript: Promises, Async/Await, and Callbacks \[Full Handbook\] \- freeCodeCamp, fecha de acceso: mayo 3, 2026, [https://www.freecodecamp.org/news/learn-async-programming-in-typescript-promises-asyncawait-and-callbacks/](https://www.freecodecamp.org/news/learn-async-programming-in-typescript-promises-asyncawait-and-callbacks/)  
29. async function \- JavaScript \- MDN Web Docs \- Mozilla, fecha de acceso: mayo 3, 2026, [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async\_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)  
30. Documentation \- Utility Types \- TypeScript, fecha de acceso: mayo 3, 2026, [https://www.typescriptlang.org/docs/handbook/utility-types.html](https://www.typescriptlang.org/docs/handbook/utility-types.html)  
31. Utility Types in TypeScript: Partial, Required, Pick, Omit and 10 more... \- DEV Community, fecha de acceso: mayo 3, 2026, [https://dev.to/rushi-patel/utility-types-in-typescript-a-detailed-explanation-2m9p](https://dev.to/rushi-patel/utility-types-in-typescript-a-detailed-explanation-2m9p)  
32. TypeScript Utility Types: How and When to Use Them (Partial, Required, Readonly, Pick, Omit, …) | by Robin Viktorsson | Medium, fecha de acceso: mayo 3, 2026, [https://medium.com/@robinviktorsson/typescript-utility-types-how-and-when-to-use-them-partial-required-readonly-pick-omit-d47c2466575c](https://medium.com/@robinviktorsson/typescript-utility-types-how-and-when-to-use-them-partial-required-readonly-pick-omit-d47c2466575c)  
33. Documentation \- TypeScript 4.0 \- TypeScript, fecha de acceso: mayo 3, 2026, [https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html\#unknown-on-catch-clause-bindings](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#unknown-on-catch-clause-bindings)  
34. Handling Errors in TypeScript: Why Use unknown in catch (e: unknown) \- DEV Community, fecha de acceso: mayo 3, 2026, [https://dev.to/jean\_lucas/handling-errors-in-typescript-why-use-unknown-in-catch-e-unknown-1aji](https://dev.to/jean_lucas/handling-errors-in-typescript-why-use-unknown-in-catch-e-unknown-1aji)  
35. Understanding the Differences Between any, unknown, and never in TypeScript \- Medium, fecha de acceso: mayo 3, 2026, [https://medium.com/@robinviktorsson/understanding-the-difference-between-any-unknown-and-never-in-typescript-6864aa33716f](https://medium.com/@robinviktorsson/understanding-the-difference-between-any-unknown-and-never-in-typescript-6864aa33716f)  
36. typescript \- 'unknown' vs. 'any' \- Stack Overflow, fecha de acceso: mayo 3, 2026, [https://stackoverflow.com/questions/51439843/unknown-vs-any](https://stackoverflow.com/questions/51439843/unknown-vs-any)  
37. The 5 commandments of clean error handling in TypeScript | by Marvin Roger | With Orus, fecha de acceso: mayo 3, 2026, [https://medium.com/with-orus/the-5-commandments-of-clean-error-handling-in-typescript-93a9cbdf1af5](https://medium.com/with-orus/the-5-commandments-of-clean-error-handling-in-typescript-93a9cbdf1af5)