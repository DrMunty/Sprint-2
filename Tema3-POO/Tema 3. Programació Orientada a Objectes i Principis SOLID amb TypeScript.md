# **Paradigmes i arquitectures de programació: una anàlisi profunda de la POO i els principis SOLID en l'ecosistema TypeScript**

L'evolució de l'enginyeria de programari ha estat un procés dialèctic entre la necessitat de gestionar una complexitat tecnològica creixent i la recerca de mètodes que facin el codi humàment comprensible, mantenible i resilient al canvi. En aquest context, la programació orientada a objectes (POO) s'ha mantingut com un paradigma dominant, proporcionant una estructura que permet modelar la realitat mitjançant entitats i comportaments definits.1 Amb l'aparició de TypeScript, aquesta tradició s'ha enfortit en l'entorn web, aportant un sistema de tipus estàtic que permet aplicar principis de disseny clàssics amb una precisió i seguretat sense precedents.3 Aquest informe tècnic explora exhaustivament els fonaments de la POO, la utilització estratègica de contractes i abstraccions, i la implementació dels principis SOLID per garantir la sostenibilitat del programari en entorns corporatius i de gran escala.

## **Els pilars fonamentals de la programació orientada a objectes en TypeScript**

La programació orientada a objectes no és simplement una qüestió de sintaxi o l'ús de la paraula clau class; és una filosofia de disseny que es recolza en quatre pilars conceptuals que treballen de manera sinèrgica per crear sistemes modulars i escalables. Aquests pilars —encapsulació, abstracció, herència i polimorfisme— actuen com els fonaments sobre els quals es construeix qualsevol arquitectura de programari robusta.1

### **L'Encapsulació: Protecció de l'estat i integritat de les dades**

L'encapsulació es defineix com l'agrupament de dades i els mètodes que les manipulen dins d'una única unitat lògica, la classe, mentre es restringeix l'accés directe als detalls interns de l'objecte des de l'exterior.1 Aquest mecanisme és vital per garantir la seguretat de les dades i reduir les dependències entre els components del sistema, evitant que modificacions accidentals en un mòdul causin errors en cascada en altres parts de l'aplicació.1  
En TypeScript, l'encapsulació s'instrumenta mitjançant l'ús de modificadors d'accés, que determinen qui pot interactuar amb les propietats i mètodes d'una classe. La visibilitat d'aquests membres es gestiona a través de tres paraules clau principals: public, private i protected.1 Per defecte, tots els membres són públics, però en un disseny professional, la majoria de l'estat intern s'hauria de marcar com a privat per complir amb el principi de menor privilegi.3  
A més dels modificadors tradicionals de TypeScript, des de la versió 3.8 s'admeten els camps privats nadius de ECMAScript (utilitzant el prefix \#), que ofereixen una privadesa real en temps d'execució, a diferència del modificador private que només s'aplica durant la comprovació de tipus en el procés de compilació.6 L'ús d'aquests mecanismes permet crear interfícies de classe netes, on només s'exposa el que és estrictament necessari, sovint a través de mètodes d'accés (getters i setters) que poden incloure lògica de validació per mantenir la coherència de l'estat intern.1  
Considerem l'exemple d'un sistema de gestió d'usuaris en una plataforma de comerç electrònic. La classe User ha de protegir informació sensible i assegurar-se que el correu electrònic tingui un format correcte abans de ser assignat:

TypeScript

class User {  
    private \_email: string;  
    private \_passwordHash: string;

    constructor(email: string, passwordHash: string) {  
        this.\_email \= email;  
        this.\_passwordHash \= passwordHash;  
    }

    public get email(): string {  
        return this.\_email;  
    }

    public setEmail(newEmail: string): void {  
        if (this.isValidEmail(newEmail)) {  
            this.\_email \= newEmail;  
        } else {  
            throw new Error("Invalid email format");  
        }  
    }

    private isValidEmail(email: string): boolean {  
        // Lògica de validació interna  
        return email.includes("@");  
    }  
}

Aquest disseny garanteix que l'única manera de canviar el correu electrònic sigui a través del mètode setEmail, el qual actua com un guardià de la integritat de les dades.1

### **L'Abstracció: Reducció de la complexitat cognitiva**

L'abstracció és el procés d'identificar els aspectes essencials d'un objecte i ignorar els detalls de la seva implementació técnica que no són rellevants per a l'usuari de l'objecte.2 L'objectiu és simplificar la visió del sistema per facilitar-ne l'ús i el manteniment. En lloc de tractar amb la complexitat del "com" funciona una cosa internament, l'abstracció ens permet centrar-nos en el "què" fa l'objecte.2  
En TypeScript, l'abstracció s'implementa principalment mitjançant interfícies i classes abstractes. Aquestes estructures defineixen contractes o models conceptuals. Per exemple, en interactuar amb un servei de persistència de dades, a la lògica de negoci no li importa si les dades s'emmagatzemen en una base de dades SQL, un fitxer local o un servei al núvol; només necessita saber que hi ha mètodes per desar i recuperar informació.3  
L'analogia d'un reproductor de música és il·lustrativa: l'usuari prem el botó "Play" (la interfície abstracta) sense necessitat de comprendre el procés de descompressió de l'arxiu d'àudio o la gestió dels buffers de memòria (els detalls de la implementació).5 L'abstracció crea una barrera protectora que permet canviar la implementació interna sense que els usuaris del component s'hagin de veure afectats per aquests canvis.2

### **L'Herència: Reutilització i jerarquització de coneixements**

L'herència és un mecanisme que permet a una classe (anomenada subclasse o classe derivada) heretar els mètodes i propietats d'una altra classe (superclasse o classe base).2 Aquesta relació modela el concepte de "és un" (is-a), permetent la creació de jerarquies taxonòmiques que reflecteixen les relacions naturals entre entitats.2  
L'avantatge principal de l'herència és la reutilització de codi. En lloc de redefinir mètodes comuns en cada classe, aquests es defineixen una vegada a la classe base i es propaguen cap avall en la jerarquia.2 Tanmateix, una herència mal dissenyada pot portar a sistemes rígids on els canvis a la base tenen conseqüències imprevistes en les derivades, una condició que s'ha de mitigar seguint principis com la Substitució de Liskov.8  
En TypeScript, l'herència es realitza amb la paraula clau extends. És obligatori cridar a super() dins del constructor de la subclasse si aquesta té el seu propi constructor, per garantir que la inicialització de la classe base es dugui a terme correctament abans d'afegir o modificar comportaments específics de la classe derivada.6

### **El Polimorfisme: Flexibilitat i comportament adaptatiu**

El polimorfisme, que significa "moltes formes", és la capacitat d'un mateix mètode o interfície d'actuar de manera diferent depenent de l'objecte sobre el qual s'invoca.1 Això permet tractar objectes de diferents classes de manera uniforme sempre que comparteixin una base comuna o implementin la mateixa interfície.1  
Hi ha dos tipus principals de polimorfisme en la POO moderna:

1. **Polimorfisme de temps de compilació (Sobrecàrrega)**: Permet definir múltiples signatures per a un mètode amb el mateix nom però diferents paràmetres. TypeScript suporta això mitjançant definicions de tipus múltiples sobre una única implementació del mètode.1  
2. **Polimorfisme de temps d'execució (Sobrescritura o Overriding)**: Una subclasse proporciona la seva pròpia versió d'un mètode que ja existeix a la classe base. Quan es crida al mètode a través d'una referència de la classe base, s'executa la versió de l'objecte real instanciat.1

El polimorfisme és la pedra angular de l'extensibilitat. Per exemple, un sistema de renderització de gràfics pot recórrer una llista d'objectes de tipus Shape i cridar al mètode draw() en cadascun. El polimorfisme garanteix que el cercle es dibuixi com a cercle i el quadrat com a quadrat, sense que el motor de renderització hagi de conèixer els detalls específics de cada figura.1

## ---

**Estratègies de disseny: Interfícies vs. Classes Abstractes**

Dins de l'ecosistema TypeScript, la decisió de si utilitzar una interfície o una classe abstracta per definir un contracte arquitectònic és una de les eleccions més conseqüents en el disseny d'un sistema. Ambdues estructures defineixen com hauria de ser un objecte, però el seu comportament en el cicle de vida de l'aplicació i les seves capacitats són profundament diferents.10

### **Diferències tècniques i existencials**

La diferència més fonamental entre ambdues és la seva existència en el temps d'execució. Les interfícies en TypeScript són estructures virtuals; s'utilitzen exclusivament per a la comprovació de tipus durant el desenvolupament i la compilació, però s'eliminen completament quan el codi es transpila a JavaScript.10 Això significa que no consumeixen memòria en el navegador ni en el servidor i no es poden utilitzar amb operadors de reflexió o instrospecció com instanceof.11  
D'altra banda, les classes abstractes són estructures híbrides que resideixen a mig camí entre la definició d'un contracte i una classe concreta. S'imprimeixen en el fitxer JavaScript resultant com a funcions o classes constructoras, la qual cosa permet utilitzar-les per comprovar tipus en temps d'execució.6 Una classe abstracta pot contenir tant mètodes sense cos (mètodes abstractes) que les subclasses estan obligades a implementar, com mètodes concrets amb lògica ja escrita que es pot reutilitzar.7

| Característica | Interfícies | Classes Abstractes |
| :---- | :---- | :---- |
| **Objectiu Principal** | Definir contractes i "formes" de dades. | Compartir lògica i definir jerarquies. |
| **Implementació** | Prohibida (només signatures). | Permesa (poden tenir mètodes amb cos). |
| **Instanciació** | Impossible. | Impossible (només mitjançant subclasses). |
| **Herència Múltiple** | Una classe pot implementar moltes interfícies. | Una classe només pot estendre una base. |
| **Runtime JS** | Desapareixen totalment. | Es conserven com a classes/funcions. |
| **Modificadors d'accés** | No permesos (tots els membres són públics). | Suport total per private, protected, public. |
| **Camps de dades** | Només noms i tipus de propietats. | Poden tenir camps privats i constructors. |

10

### **Criteris de decisió arquitectònica**

L'elecció dependrà de si el dissenyador busca un acoblament estructural o un acoblament funcional.  
S'ha d'optar per una **interfície** quan:

* Es vol definir un contracte per a objectes que no tenen una relació de parentiu lògic (com ara "comportaments transversals"). Per exemple, un mètode serialize() podria ser necessari per a classes d'usuaris, productes i transaccions que no comparteixen cap base comuna.10  
* Es busca la màxima flexibilitat i s'evita la rigidesa de l'herència única. Una classe pot signar molts contractes (interfícies) però només pot tenir un pare biològic (classe).11  
* Es volen definir estructures de dades pures (com objectes de configuració o respostes d'API) que no requereixen cap lògica interna.10

S'ha d'optar per una **classe abstracta** quan:

* Es volen evitar duplicacions de codi proporcionant implementacions per defecte o mètodes d'utilitat que seran idèntics en totes les subclasses.7  
* Es necessita protegir l'estat o certs mètodes auxiliars utilitzant el modificador protected, garantint que només les classes derivades puguin utilitzar certs recursos interns.6  
* Es treballa amb frameworks de Injecció de Dependències (DI) com NestJS. En molts d'aquests sistemes, les interfícies no es poden utilitzar com a "tokens" d'injecció perquè no existeixen en temps d'execució, obligant l'ús de classes abstractes per poder resoldre les dependències correctament.18

## ---

**Els Principis SOLID: Construint programari resilient**

L'acrònim SOLID representa cinc principis bàsics de disseny orientat a objectes que, quan s'apliquen de manera conjunta, transformen el programari rígid i fràgil en un sistema modular i adaptable. Aquests principis van ser codificats per Robert C. Martin i han esdevingut l'estàndard d'or per a la creació d'arquitectures netes.4

### **SRP: Principi de Responsabilitat Única (Single Responsibility Principle)**

El principi SRP estableix que "una classe ha de tenir una sola raó per canviar", la qual cosa es tradueix en què cada component ha d'assumir una única tasca o responsabilitat dins del sistema.21 Quan una classe acumula múltiples responsabilitats, es torna difícil de mantenir: un canvi en la lògica d'enviament de correus podria trencar involuntàriament la lògica de càlcul d'impostos si ambdues resideixen en la mateixa classe.9  
En un projecte TypeScript real, el SRP ens anima a separar la lògica d'accés a dades de la lògica de negoci i de la lògica de presentació. Una classe que gestiona usuaris no hauria de saber com escriure en un fitxer de registre o com enviar una notificació Push.19 L'aplicació del SRP resulta en classes més petites, més cohesives i significativament més fàcils de sotmetre a tests unitaris.20

### **OCP: Principi Obert/Tancat (Open/Closed Principle)**

El principi OCP postula que les entitats de programari (classes, mòduls, funcions) han d'estar "obertes per a l'extensió, però tancades per a la modificació".22 Això significa que el comportament d'un mòdul s'ha de poder ampliar sense haver de canviar el seu codi font original.  
La violació clàssica d'aquest principi és l'ús de blocs switch o llargues cadenes de if/else basades en tipus d'objectes. Cada vegada que s'afegeix un nou tipus, cal obrir el fitxer i modificar el mètode, augmentant el risc de regressions en funcionalitats que ja estaven provades i funcionaven bé.24 La solució a través d'OCP és utilitzar el polimorfisme: definir una interfície comuna i permetre que cada nova funcionalitat sigui una nova classe que implementi aquesta interfície.26

### **LSP: Principi de Substitució de Liskov (Liskov Substitution Principle)**

Formulat per Barbara Liskov, aquest principi exigeix que les subclasses siguin completament substituïbles per les seves classes base sense que això alteri el comportament correcte del programa.22 Si tenim una funció que accepta un objecte de tipus Bird, aquesta funció ha de seguir funcionant si li passem un Sparrow o un Penguin.  
Si la classe Penguin hereta de Bird però el mètode fly() llança una excepció perquè els pingüins no volen, estem violant l'LSP. El codi client que esperava que qualsevol ocell pogués volar fallarà catastròficament.9 L'LSP ens ensenya que l'herència no s'ha de basar només en relacions semàntiques del món real, sinó en la compatibilitat de comportaments i contractes de programació.9

### **ISP: Principi de Segregació d'Interfícies (Interface Segregation Principle)**

L'ISP afirma que "els clients no han de ser obligats a dependre d'interfícies que no utilitzen".22 Aquest principi combat les interfícies massa grans o monolítiques. En lloc de tenir una interfície Worker que inclogui mètodes com work(), eat() i sleep(), és millor tenir interfícies separades com Workable i Eatable.22  
Això evita que, per exemple, una classe Robot que implementa Worker es vegi obligada a implementar el mètode eat() (probablement deixant-lo buit o llançant un error), cosa que crea un acoblament innecessari i brutícia en el codi.22 Interfícies petites i cohesionades porten a un sistema més modular i menys fràgil davant els canvis de requisits.37

### **DIP: Principi d'Inversió de Dependències (Dependency Inversion Principle)**

El DIP és potser el més influent en l'arquitectura de sistemes moderns. Estableix que els mòduls d'alt nivell (els que contenen la lògica de negoci) no han de dependre dels mòduls de baix nivell (els que gestionen els detalls com la base de dades o el sistema de fitxers). Ambdós han de dependre d'abstraccions.22  
Tradicionalment, una classe Store instanciaria directament una classe MySQLDatabase. Amb DIP, la classe Store depèn d'una interfície IDatabase. D'aquesta manera, podem canviar el motor de base de dades o utilitzar un objecte simulat per a les proves sense haver de canviar ni una sola línia de codi a la classe Store.39 El control de la dependència s'inverteix: la política d'alt nivell ja no està a mercè dels detalls d'implementació.40

## ---

**La sinergia entre DIP i Injecció de Dependències (DI)**

Dins del disseny de programari professional, és fonamental distingir entre el **Principi d'Inversió de Dependències (DIP)** i el **Patró d'Injecció de Dependències (DI)**. Encara que es relacionen estretament, operen en nivells conceptuals diferents: el primer és una guia estratègica i el segon és una eina tàctica.40

### **El mecanisme d'acoblament lax**

El DIP ens indica la direcció correcta de les nostres dependències: cap a l'abstracció.39 Tanmateix, si una classe d'alt nivell depèn d'una interfície però encara és l'encarregada d'instanciar l'objecte concret que la implementa (utilitzant new MyConcreteService()), encara estem fortament acoblats a la implementació.40 Aquí és on intervé la **Injecció de Dependències**.  
La DI és el patró que ens permet externalitzar la creació de les dependències d'una classe. En lloc que la classe busqui o creï el que necessita, les dependències li són "injectades" des de l'exterior, normalment a través del seu constructor.43 Això ens permet separar completament la *configuració* del sistema del seu *ús*.39

### **Impacte en la testeabilitat i la mantenibilitat**

Aquesta separació té un valor pràctic immens en el cicle de vida del desenvolupament:

1. **Testeabilitat radical**: Amb la DI, podem injectar fàcilment "mocks" o "stubs" en lloc dels serveis reals durant les proves unitàries.40 Si una classe realitza càrrecs en una passarel·la de pagament real, no volem que els nostres tests enviïn diners cada vegada que s'executen. Injectant una versió simulada de la passarel·la, podem provar la lògica de la nostra classe de forma ràpida i segura.39  
2. **Mantenibilitat evolutiva**: Si decidim canviar el nostre proveïdor de correu electrònic de SendGrid a Mailchimp, no hem de buscar cada lloc on es feia servir el servei. Només hem de crear una nova implementació de la interfície de correu i canviar la injecció en el punt central d'assemblatge del programa (el contenidor IoC o el punt d'entrada de l'aplicació).20  
3. **Reducció de la fragilitat**: El sistema es torna menys sensible als canvis interns en els serveis de baix nivell. Sempre que el contracte definit per la interfície es mantingui estable, els canvis en la implementació no es propagaran cap a les capes superiors del sistema.29

## ---

**El valor estratègic de SOLID en projectes de gran escala**

L'aplicació sistemàtica dels principis SOLID no és un exercici acadèmic, sinó una necessitat crítica en el desenvolupament d'aplicacions empresarials o de gran escala on el cost de manteniment pot arribar a ser deu vegades superior al cost inicial de desenvolupament.20

### **Beneficis a llarg termini**

L'adopció d'una cultura de disseny basada en SOLID aporta beneficis que es mesuren en l'agilitat del negoci i la qualitat del producte:

* **Minimització del deute tècnic**: El deute tècnic és l'interès que paguem per decisions de disseny ràpides però brutes. SOLID obliga a un disseny modular que evita l'acumulació de codi complex i interconnectat, permetent que el sistema segueixi sent adaptable anys després de la seva creació.20  
* **Millora de la col·laboració en equip**: En projectes amb molts desenvolupadors, les fronteres clares creades per interfícies i responsabilitats úniques permeten que diferents equips treballin en diferents parts del codi sense trepitjar-se les unes a les altres.20 Un canvi en el mòdul de facturació té un impacte zero en el mòdul d'inventari si estan ben segregats.20  
* **Productivitat i velocitat de lliurament**: Encara que escriure codi SOLID pot ser més lent al principi a causa de la necessitat de definir interfícies i abstraccions, a llarg termini la velocitat d'implementació de noves funcionalitats es manté constant. En els sistemes sense aquests principis, la velocitat cau en picat a mesura que el sistema creix i cada canvi introdueix deu nous errors.4  
* **Resiliència tecnològica**: Els principis SOLID preparen l'arquitectura per al núvol i per als microserveis. Les unitats petites i desacoblades són molt més fàcils de moure a contenidors, d'escalar de manera independent o de migrar a noves infraestructures sense haver de refer tot el sistema des de zero.20

### **Una visió del cicle de vida del programari**

A continuació es presenta una comparativa de l'impacte dels principis SOLID en diferents dimensions de l'enginyeria de programari:

| Dimensió | Sense SOLID (Disseny Rígid) | Amb SOLID (Disseny Neta) |
| :---- | :---- | :---- |
| **Afegir funcionalitats** | Requereix canvis en codi existent (alt risc). | Es fa mitjançant l'addició de noves classes (baix risc). |
| **Correcció d'errors** | Localitzar l'error és difícil per l'acoblament. | El SRP permet aïllar l'error ràpidament en un mòdul. |
| **Onboarding de personal** | Corba d'aprenentatge molt pronunciada. | Codi auto-documentat i fàcil d'entendre. |
| **Cicle de vida del test** | Tests fràgils que sovint es trenquen per canvis en dependències. | Tests estables gràcies a l'ús de mocks i injecció de dependències. |
| **Reutilització de codi** | Quasi impossible (components massa lligats). | Alta (mòduls desacoblats i genèrics). |

20

## ---

**Cas pràctic: Refactorització d'una arquitectura monòlita**

Identificar moments de refactorització és una habilitat clau per a qualsevol arquitecte de programari. Imaginem un servei de gestió de comandes en una aplicació existent que inicialment es va dissenyar com una unitat única:

### **La situació original (Violació de SRP i OCP)**

La classe OrderService s'encarrega de validar la comanda, connectar-se a la base de dades, processar el pagament amb una llibreria externa, enviar el correu de confirmació i registrar els logs d'error.

TypeScript

class OrderService {  
    async processOrder(order: any) {  
        // Validació  
        if (order.total \<= 0\) throw new Error("Invalid total");  
          
        // Persistència directa a la BD  
        const db \= new MySQLConnection();  
        await db.save(order);  
          
        // Pagament acoblat a Stripe  
        const stripe \= new StripeAPI();  
        await stripe.charge(order.total);  
          
        // Notificació acoblada a SMTP  
        console.log("Sending email confirmation...");  
    }  
}

Aquest disseny és un malson de manteniment. Si canviem de base de dades, hem de canviar aquesta classe. Si Stripe apuja les comissions i ens movem a PayPal, hem de canviar aquesta classe. Si volem fer un test unitari, necessitem una connexió a la BD real i un compte de Stripe vàlid.24

### **La solució refactoritzada (Aplicant SRP, OCP i DIP)**

En lloc d'aquesta classe massiva, dividim les responsabilitats i injectem les dependències a través d'abstraccions 19:

1. **SRP**: Creem OrderRepository, PaymentProcessor i NotificationService. Cada un té una sola raó per canviar.19  
2. **DIP**: L' OrderService ara només depèn d'interfícies: IOrderRepository, IPaymentGateway i INotifier.40  
3. **OCP**: Si volem afegir un nou mètode de pagament, només hem d'implementar una nova classe que compleixi la interfície IPaymentGateway, sense tocar el codi de OrderService.24

TypeScript

class OrderService {  
    constructor(  
        private repository: IOrderRepository,  
        private paymentGateway: IPaymentGateway,  
        private notifier: INotifier  
    ) {}

    async processOrder(order: Order) {  
        this.validate(order);  
        await this.repository.save(order);  
        await this.paymentGateway.pay(order.amount);  
        await this.notifier.notify("Order confirmed");  
    }

    private validate(order: Order) { /\*... \*/ }  
}

Amb aquest disseny, la qualitat de l'arquitectura ha fet un salt qualitatiu. Hem reduït el risc de regressió, hem facilitat les proves i hem creat un sistema que pot evolucionar a la velocitat que el negoci necessiti.20

## **Conclusió**

L'enginyeria de programari moderna no consisteix en escriure codi que la màquina pugui executar, sinó en escriure codi que els humans puguin mantenir i evolucionar. Els pilars de la POO ens proporcionen les eines de construcció bàsiques, mentre que els principis SOLID actuen com el plànol arquitectònic que ens guia en la seva aplicació correcta. En el domini de TypeScript, aquestes pràctiques es tornen encara més potents gràcies a la seguretat de tipus i les capacitats d'abstracció del llenguatge. Ignorar aquests principis condueix inevitablement a la rigidesa i a l'obsolescència prematura de les aplicacions. Per contra, l'adopció de l'encapsulació, el polimorfisme, la injecció de dependències i la segregació de responsabilitats és la millor garantia per a la longevitat i l'èxit de qualsevol projecte de programari de gran abast.

#### **Obras citadas**

1. The Four Pillars of Object-Oriented Programming in TypeScript \- DEV Community, fecha de acceso: mayo 3, 2026, [https://dev.to/coder7475/the-four-pillars-of-object-oriented-programming-in-typescript-1mf9](https://dev.to/coder7475/the-four-pillars-of-object-oriented-programming-in-typescript-1mf9)  
2. Four pillars of Object-Oriented Programming in TypeScript, fecha de acceso: mayo 3, 2026, [https://content.techgig.com/career-advice/mastering-object-oriented-programming-in-typescript-the-four-pillars-explained/articleshow/123467510.cms](https://content.techgig.com/career-advice/mastering-object-oriented-programming-in-typescript-the-four-pillars-explained/articleshow/123467510.cms)  
3. Understanding Basic OOP Concepts in TypeScript | by Saurja Ghosh | Medium, fecha de acceso: mayo 3, 2026, [https://medium.com/@saurja/understanding-basic-oop-concepts-in-typescript-5275743acc99](https://medium.com/@saurja/understanding-basic-oop-concepts-in-typescript-5275743acc99)  
4. Clean Code & SOLID: Uncle Bob's Practical Guide, fecha de acceso: mayo 3, 2026, [https://cleancodeguy.com/blog/robert-martin-uncle-bob](https://cleancodeguy.com/blog/robert-martin-uncle-bob)  
5. The Four Pillars of OOPs (Object Oriented Programming) \- AlmaBetter, fecha de acceso: mayo 3, 2026, [https://www.almabetter.com/bytes/articles/four-pillars-of-oops](https://www.almabetter.com/bytes/articles/four-pillars-of-oops)  
6. Handbook \- Classes \- TypeScript, fecha de acceso: mayo 3, 2026, [https://www.typescriptlang.org/docs/handbook/classes.html](https://www.typescriptlang.org/docs/handbook/classes.html)  
7. When to Use TypeScript Abstract Classes | Khalil Stemmler, fecha de acceso: mayo 3, 2026, [https://khalilstemmler.com/blogs/typescript/abstract-class/](https://khalilstemmler.com/blogs/typescript/abstract-class/)  
8. Applying SOLID principles to TypeScript \- LogRocket Blog, fecha de acceso: mayo 3, 2026, [https://blog.logrocket.com/applying-solid-principles-typescript/](https://blog.logrocket.com/applying-solid-principles-typescript/)  
9. SOLID Principles Explained with Complete Java Examples (Violations \+ Refactoring) | by Rusiru Devinda | Medium, fecha de acceso: mayo 3, 2026, [https://medium.com/@rusirud49/solid-principles-explained-with-complete-java-examples-violations-refactoring-c634662dda49](https://medium.com/@rusirud49/solid-principles-explained-with-complete-java-examples-violations-refactoring-c634662dda49)  
10. Classes vs Interfaces in TypeScript \- Ultimate Courses, fecha de acceso: mayo 3, 2026, [https://ultimatecourses.com/blog/classes-vs-interfaces-in-typescript](https://ultimatecourses.com/blog/classes-vs-interfaces-in-typescript)  
11. What is the difference between interface and abstract class in Typescript? \- Stack Overflow, fecha de acceso: mayo 3, 2026, [https://stackoverflow.com/questions/50110844/what-is-the-difference-between-interface-and-abstract-class-in-typescript](https://stackoverflow.com/questions/50110844/what-is-the-difference-between-interface-and-abstract-class-in-typescript)  
12. Handbook \- Interfaces \- TypeScript, fecha de acceso: mayo 3, 2026, [https://www.typescriptlang.org/docs/handbook/interfaces.html](https://www.typescriptlang.org/docs/handbook/interfaces.html)  
13. What is the difference between an interface and abstract class? \- Stack Overflow, fecha de acceso: mayo 3, 2026, [https://stackoverflow.com/questions/1913098/what-is-the-difference-between-an-interface-and-abstract-class](https://stackoverflow.com/questions/1913098/what-is-the-difference-between-an-interface-and-abstract-class)  
14. Interfaces vs Abstract Classes \- TypeScript Tutorial, fecha de acceso: mayo 3, 2026, [https://www.typescripttutorial.net/typescript-tutorial/interfaces-vs-abstract-classes/](https://www.typescripttutorial.net/typescript-tutorial/interfaces-vs-abstract-classes/)  
15. What are the differences between abstract classes, interfaces, and when to use them, fecha de acceso: mayo 3, 2026, [https://softwareengineering.stackexchange.com/questions/173518/what-are-the-differences-between-abstract-classes-interfaces-and-when-to-use-t](https://softwareengineering.stackexchange.com/questions/173518/what-are-the-differences-between-abstract-classes-interfaces-and-when-to-use-t)  
16. Clean Code with Multiple Classes in TypeScript: Interfaces and Abstract Classes | CodeSignal Learn, fecha de acceso: mayo 3, 2026, [https://codesignal.com/learn/courses/clean-code-with-multiple-classes-2/lessons/clean-code-with-multiple-classes-in-typescript-interfaces-and-abstract-classes](https://codesignal.com/learn/courses/clean-code-with-multiple-classes-2/lessons/clean-code-with-multiple-classes-in-typescript-interfaces-and-abstract-classes)  
17. Abstract Class vs Interface: Use Cases, Benefits & Best Practices \- Medium, fecha de acceso: mayo 3, 2026, [https://medium.com/@priyaiotacademy122\_2106/abstract-class-vs-interface-use-cases-benefits-best-practices-b4b1e2226cb0](https://medium.com/@priyaiotacademy122_2106/abstract-class-vs-interface-use-cases-benefits-best-practices-b4b1e2226cb0)  
18. Interfaces vs. Abstract Classes in TypeScript: Which to use for contracts and code reuse?, fecha de acceso: mayo 3, 2026, [https://www.reddit.com/r/brdev/comments/1n5bcw2/interfaces\_vs\_classes\_abstratas\_em\_typescript/?tl=en](https://www.reddit.com/r/brdev/comments/1n5bcw2/interfaces_vs_classes_abstratas_em_typescript/?tl=en)  
19. Software Architecture: Mastering S.O.L.I.D Principles with Practical ..., fecha de acceso: mayo 3, 2026, [https://levelup.gitconnected.com/software-architecture-mastering-s-o-l-i-d-principles-with-practical-examples-in-typescript-b4932f772920](https://levelup.gitconnected.com/software-architecture-mastering-s-o-l-i-d-principles-with-practical-examples-in-typescript-b4932f772920)  
20. Understanding SOLID principles in software design \- Upsun, fecha de acceso: mayo 3, 2026, [https://upsun.com/blog/solid-principles-in-software-design/](https://upsun.com/blog/solid-principles-in-software-design/)  
21. SOLID Principles in JavaScript : How to Take Your Code to the Next Level \- Dev Genius, fecha de acceso: mayo 3, 2026, [https://blog.devgenius.io/solid-principles-in-javascript-how-to-take-your-code-to-the-next-level-ab5a49948304](https://blog.devgenius.io/solid-principles-in-javascript-how-to-take-your-code-to-the-next-level-ab5a49948304)  
22. Applying SOLID Principles in TypeScript | CodeSignal Learn, fecha de acceso: mayo 3, 2026, [https://codesignal.com/learn/courses/applying-clean-code-principles-1/lessons/applying-solid-principles-in-typescript](https://codesignal.com/learn/courses/applying-clean-code-principles-1/lessons/applying-solid-principles-in-typescript)  
23. SOLID Design Principles: The Single Responsibility Explained \- Stackify, fecha de acceso: mayo 3, 2026, [https://stackify.com/solid-design-principles/](https://stackify.com/solid-design-principles/)  
24. SOLID Design Principles Every JavaScript and TypeScript Developer Should Know \- Strapi, fecha de acceso: mayo 3, 2026, [https://strapi.io/blog/solid-design-principles-javascript-typescript-guide](https://strapi.io/blog/solid-design-principles-javascript-typescript-guide)  
25. SOLID Principles with Real Life Examples \- GeeksforGeeks, fecha de acceso: mayo 3, 2026, [https://www.geeksforgeeks.org/system-design/solid-principle-in-programming-understand-with-real-life-examples/](https://www.geeksforgeeks.org/system-design/solid-principle-in-programming-understand-with-real-life-examples/)  
26. SOLID: Open/Closed Principle in TypeScript | by Yukti Arora | Medium, fecha de acceso: mayo 3, 2026, [https://medium.com/@yukti22/solid-open-closed-principle-in-typescript-6aec7897fee4](https://medium.com/@yukti22/solid-open-closed-principle-in-typescript-6aec7897fee4)  
27. Open-Closed Principle Guide (TypeScript & React) | Clean Code Guy, fecha de acceso: mayo 3, 2026, [https://cleancodeguy.com/blog/open-closed-principle](https://cleancodeguy.com/blog/open-closed-principle)  
28. SOLID Design Principles Explained: Building Better Software Architecture \- DigitalOcean, fecha de acceso: mayo 3, 2026, [https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)  
29. SOLID Design Principles: Hands-On Examples \- Splunk, fecha de acceso: mayo 3, 2026, [https://www.splunk.com/en\_us/blog/learn/solid-design-principle.html](https://www.splunk.com/en_us/blog/learn/solid-design-principle.html)  
30. Liskov Substitution Principle In Typescript: Explained \- DEV Community, fecha de acceso: mayo 3, 2026, [https://dev.to/hassanzohdy/liskov-substitution-principle-in-typescript-explained-5160](https://dev.to/hassanzohdy/liskov-substitution-principle-in-typescript-explained-5160)  
31. The SOLID Principles in Real Life \- DaedTech, fecha de acceso: mayo 3, 2026, [https://daedtech.com/solid-principles-real-life/](https://daedtech.com/solid-principles-real-life/)  
32. Liskov Substitution Principle (LSP) \- GitHub Pages, fecha de acceso: mayo 3, 2026, [https://stg-tud.github.io/sedc/Lecture/ws13-14/3.3-LSP.html](https://stg-tud.github.io/sedc/Lecture/ws13-14/3.3-LSP.html)  
33. Does this code solve the square/rectangle Liskov Substitution Principle example?, fecha de acceso: mayo 3, 2026, [https://softwareengineering.stackexchange.com/questions/303546/does-this-code-solve-the-square-rectangle-liskov-substitution-principle-example](https://softwareengineering.stackexchange.com/questions/303546/does-this-code-solve-the-square-rectangle-liskov-substitution-principle-example)  
34. Interface Segregation Principle (ISP) in Typescript \- DEV Community, fecha de acceso: mayo 3, 2026, [https://dev.to/hassanzohdy/interface-segregation-principle-isp-in-typescript-nf8](https://dev.to/hassanzohdy/interface-segregation-principle-isp-in-typescript-nf8)  
35. SOLID principles using Typescript \- Samuele Resca, fecha de acceso: mayo 3, 2026, [https://samueleresca.net/solid-principles-using-typescript/](https://samueleresca.net/solid-principles-using-typescript/)  
36. Why top engineering leaders swear by SOLID principles \- Okoone, fecha de acceso: mayo 3, 2026, [https://www.okoone.com/spark/leadership-management/why-top-engineering-leaders-swear-by-solid-principles/](https://www.okoone.com/spark/leadership-management/why-top-engineering-leaders-swear-by-solid-principles/)  
37. Interface Segregation Principle (ISP) with TypeScript examples | by Oleksandr Khomyakov, fecha de acceso: mayo 3, 2026, [https://medium.com/@khomyakov/interface-segregation-principle-isp-with-typescript-examples-8f82f538a9b2](https://medium.com/@khomyakov/interface-segregation-principle-isp-with-typescript-examples-8f82f538a9b2)  
38. Mastering Software Design: Why SOLID Principles Matter | by Jether Rodrigues | Medium, fecha de acceso: mayo 3, 2026, [https://jetherrodrigues.dev.br/mastering-software-design-why-solid-principles-matter-41de921edc7e](https://jetherrodrigues.dev.br/mastering-software-design-why-solid-principles-matter-41de921edc7e)  
39. Understanding the dependency inversion principle (DIP) \- LogRocket Blog, fecha de acceso: mayo 3, 2026, [https://blog.logrocket.com/dependency-inversion-principle/](https://blog.logrocket.com/dependency-inversion-principle/)  
40. Mastering the Dependency Inversion Principle | Clean Code Guy, fecha de acceso: mayo 3, 2026, [https://cleancodeguy.com/blog/dependency-inversion-principle](https://cleancodeguy.com/blog/dependency-inversion-principle)  
41. Dependency Inversion Principle with TypeScript Interfaces & Decorators \- DEV Community, fecha de acceso: mayo 3, 2026, [https://dev.to/mbarzeev/dependency-inversion-principle-with-typescript-interfaces-decorators-2fd6](https://dev.to/mbarzeev/dependency-inversion-principle-with-typescript-interfaces-decorators-2fd6)  
42. Difference between dependency injection and dependency inversion \- Stack Overflow, fecha de acceso: mayo 3, 2026, [https://stackoverflow.com/questions/46709170/difference-between-dependency-injection-and-dependency-inversion](https://stackoverflow.com/questions/46709170/difference-between-dependency-injection-and-dependency-inversion)  
43. Inversion of Control Containers and the Dependency Injection pattern, fecha de acceso: mayo 3, 2026, [https://martinfowler.com/articles/injection.html](https://martinfowler.com/articles/injection.html)  
44. Dependency Injection for Typescript projects \- Typeix, fecha de acceso: mayo 3, 2026, [https://typeix.com/documentation/fundamentals/di/](https://typeix.com/documentation/fundamentals/di/)  
45. Dependency Inversion VS Dependency Injection | by Shehan Vanderputt \- Medium, fecha de acceso: mayo 3, 2026, [https://medium.com/@stanislousvanderputt/dependency-inversion-vs-dependency-injection-35e0bf47510a](https://medium.com/@stanislousvanderputt/dependency-inversion-vs-dependency-injection-35e0bf47510a)  
46. Dependency Injection or Inversion? \- DaedTech, fecha de acceso: mayo 3, 2026, [https://daedtech.com/dependency-injection-or-inversion/](https://daedtech.com/dependency-injection-or-inversion/)  
47. Unit Test Like a Pro: Automock, My Open Source Answer to Mocking Frustration \- DEV Community, fecha de acceso: mayo 3, 2026, [https://dev.to/omermorad/unit-test-like-a-pro-automock-my-open-source-answer-to-mocking-frustration-31p4](https://dev.to/omermorad/unit-test-like-a-pro-automock-my-open-source-answer-to-mocking-frustration-31p4)  
48. Mock dependency in Jest with TypeScript \- javascript \- Stack Overflow, fecha de acceso: mayo 3, 2026, [https://stackoverflow.com/questions/48759035/mock-dependency-in-jest-with-typescript](https://stackoverflow.com/questions/48759035/mock-dependency-in-jest-with-typescript)  
49. What are SOLID Principles? | Contabo Blog, fecha de acceso: mayo 3, 2026, [https://contabo.com/blog/what-are-solid-principles/](https://contabo.com/blog/what-are-solid-principles/)  
50. The Art of Clean Code: Transformative Lessons from Robert C. Martin \- K Manoj Kumar, fecha de acceso: mayo 3, 2026, [https://kmanojkumar.com/the-art-of-clean-code-transformative-lessons-from-robert-c-martin/](https://kmanojkumar.com/the-art-of-clean-code-transformative-lessons-from-robert-c-martin/)  
51. Clean Code Tutorial \- TutorialsPoint, fecha de acceso: mayo 3, 2026, [https://www.tutorialspoint.com/clean-code-fundamentals/index.htm](https://www.tutorialspoint.com/clean-code-fundamentals/index.htm)  
52. Mastering SOLID Principles: Write Clean, Efficient, and Scalable Code \- Medium, fecha de acceso: mayo 3, 2026, [https://medium.com/@rana.akansha321/mastering-solid-principles-write-clean-efficient-and-scalable-code-33ee7de832e8](https://medium.com/@rana.akansha321/mastering-solid-principles-write-clean-efficient-and-scalable-code-33ee7de832e8)  
53. What are the 5 Solid principles? What is SOLID and what is it for? \- ThePower Education, fecha de acceso: mayo 3, 2026, [https://thepower.education/en/blog/what-are-the-solid-principles](https://thepower.education/en/blog/what-are-the-solid-principles)  
54. Dependency Injection in JavaScript: Write Testable Code Easily | AppSignal Blog, fecha de acceso: mayo 3, 2026, [https://blog.appsignal.com/2022/02/16/dependency-injection-in-javascript-write-testable-code-easily.html](https://blog.appsignal.com/2022/02/16/dependency-injection-in-javascript-write-testable-code-easily.html)