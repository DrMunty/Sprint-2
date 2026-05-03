# **Marcs de Treball Avançats per a la Verificació de Programari: Paradigmes Estratègics en Proves Automatitzades i Metodologia de Desenvolupament**

La transició de la supervisió manual tradicional en el desenvolupament de programari cap a un marc de verificació robust i automatitzat representa un canvi fonamental en l'economia i la fiabilitat de l'enginyeria de programari moderna. En l'entorn actual de lliurament continu i DevOps, la capacitat de llançar programari amb velocitat i precisió ja no és un avantatge competitiu, sinó un requisit bàsic per a la supervivència organitzativa. Les proves manuals, tot i ser valuoses per a finalitats exploratòries i d'usabilitat, estan limitades per la velocitat humana, la càrrega cognitiva i la introducció inevitable d'errors mitjançant la repetició. La verificació automatitzada aborda aquestes vulnerabilitats sistèmiques introduint un bucle de retroacció reduït que informa els desenvolupadors sobre regressions o errors en qüestió de segons, en lloc dels dies o setmanes típics dels cicles manuals.1

## **Els Avantatges Socio-Tècnics de la Verificació Automatitzada**

La implementació de suites de proves automatitzades ofereix un benefici multidimensional al cicle de vida del desenvolupament, categoritzat principalment a través de la velocitat d'execució, la identificació precoç de defectes i la creació de "Documentació Viva". En automatitzar les tasques de verificació repetitives, els equips d'enginyeria alleugen la càrrega psicològica dels protocols de clic manual, que són notòriament tediosos i propensos a l'omissió humana.1 Quan les proves estan automatitzades, els desenvolupadors poden refactoritzar codis a gran escala amb confiança; la presència d'una suite de proves exhaustiva actua com una xarxa de seguretat, assegurant que els canvis arquitectònics interns no alterin el comportament observable del sistema.1

### **Velocitat i l'Economia del Feedback**

L'avantatge més immediat que ofereixen les proves automatitzades és la reducció dràstica del bucle de retroacció. En un entorn àgil, saber si un canvi de codi específic ha trencat la funcionalitat existent en qüestió de segons és transformador.1 Aquesta velocitat no és només una qüestió de conveniència; és una necessitat econòmica. El cost de corregir un defecte augmenta exponencialment a mesura que avança en el pipeline de desenvolupament. Les proves unitàries automatitzades en les etapes inicials ajuden a identificar i resoldre problemes abans que puguin manifestar-se com a defectes en etapes posteriors, optimitzant així l'assignació de recursos.2

### **La Documentació Viva com a Actiu Estratègic**

Un benefici secundari, però profund, de les proves automatitzades és la seva funció com a documentació viva. La documentació tradicional sovint es desconnecta del codi real que pretén descriure, portant a un estat on el codi o el document esdevenen obsolets.3 Les proves automatitzades, per contra, són especificacions executables del comportament previst del sistema.3 Una suite de proves ben escrita explica les suposicions, els casos límit i la lògica de negoci de l'aplicació en un format que ha de mantenir-se precís per poder superar-se.6 Això crea un dipòsit de coneixement que s'auto-repara on els nous desenvolupadors poden entendre els requisits d'un component simplement llegint les seves proves, que descriuen què *fa* el sistema més que com està *implementat*.7

| Avantatge | Mecanisme Tècnic | Resultat Estratègic |
| :---- | :---- | :---- |
| **Velocitat d'Execució** | Execució de scripts en paral·lel i recàrrega en calent. 6 | Permet múltiples desplegaments diaris i iteració ràpida. 1 |
| **Detecció Precoç** | Portes d'integració contínua que executen proves en cada commit. 11 | Minimitza el cost de propietat detectant errors en l'origen. 2 |
| **Documentació Viva** | Especificacions executables mitjançant assercions d'estil BDD. 7 | Redueix el temps d'incorporació i garanteix l'alineació entre negoci i codi. 6 |
| **Seguretat en Refactoritzar** | Suites de regressió que validen el comportament després de canvis interns. 1 | Fomenta la reducció contínua del deute tècnic sense risc de fallada. 1 |

## **Taxonomia Arquitectònica: La Piràmide de Proves**

Per mantenir un portfoli de proves eficient, els arquitectes de programari utilitzen la metàfora de la "Piràmide de Proves".1 La piràmide organitza les proves en capes diferents segons la seva granularitat, velocitat i cost. La integritat estructural d'una suite de proves depèn de mantenir la forma de piràmide: una base àmplia de milers de proves unitàries petites i ràpides, una capa mitjana més petita de proves d'integració i un nombre mínim de proves d'extrem a extrem (E2E) a l'àpex.1

### **Proves Unitàries: La Fundació de la Lògica Granular**

Les proves unitàries són la capa fonamental de la pila de verificació. Estan dissenyades per provar una única "unitat" de codi —normalment una funció, mètode o classe— en total aïllament de factors externs.1 L'objectiu principal és validar que la lògica interna d'un mòdul és correcta donades diverses entrades i estats.1 Com que aquestes proves eviten les crides de xarxa i les interaccions amb la base de dades, són extremadament ràpides.6 Un exemple seria una funció de càlcul d'impostos: la prova proporciona uns ingressos bruts i espera un valor net específic, assegurant que les fórmules es realitzen correctament sense consultar una base de dades real.3

### **Proves d'Integració: Validant les Unions**

Les proves d'integració cobreixen l'espai entre unitats, verificant que diferents mòduls o sistemes interactuen correctament.1 Aquestes proves són essencials per detectar defectes que ocorren en les "unions" d'una aplicació, on les suposicions d'un component poden xocar amb la implementació d'un altre.1 Sovint es centren en els límits del servei, comprovant interaccions amb magatzems persistents, sistemes de fitxers o APIs de tercers.1 Per exemple, una prova d'integració per a un servei de "Gestió de Tasques" verificaria que una crida a l'API createTask persisteix correctament un registre en una instància de base de dades real (sovint en memòria).16

### **Proves End-to-End (E2E): Verificació des de la Perspectiva de l'Usuari**

Les proves E2E ocupen la part superior de la piràmide i validen fluxos de treball complets de l'usuari d'inici a fi.2 Aquestes proves simulen l'ús real dirigint l'aplicació a través de la seva interfície d'usuari o les seves interfícies externes principals.1 Tot i que proporcionen el nivell més alt de confiança que el sistema funciona per a l'usuari, també són les més fràgils i lentes.1 Exemples d'E2E inclouen simular un client iniciant sessió, navegant per un catàleg, afegint un element al carret i completant una compra.2

| Nivell de Prova | Abast de la Verificació | Eines Principals d'Exemple | Perfil de Manteniment |
| :---- | :---- | :---- | :---- |
| **Unitat** | Lògica atòmica, funcions aïllades. 1 | Jest, Vitest, Mocha. 6 | Baix; molt estable. 1 |
| **Integració** | Interaccions entre mòduls, persistència. 1 | Supertest, MongoMemoryServer. 16 | Mitjà; requereix entorn. 2 |
| **End-to-End** | Rutes d'usuari completes, multi-sistema. 2 | Playwright, Selenium, Cypress. 1 | Alt; propens a la inestabilitat. 1 |

## **L'Anatomia d'una Prova de Qualitat: El Patró AAA**

Per garantir que les proves automatitzades siguin mantenibles i llegibles, es recomana el patró **Arrange-Act-Assert (AAA)**.20 Aquesta convenció estructural imposa una separació clara de responsabilitats dins de cada cas de prova:

1. **Arrange (Preparar)**: El desenvolupador configura les precondicions per a la prova (inicialitzar objectes, preparar dades d'exemple, configurar mocks).21  
2. **Act (Actuar)**: L'execució del comportament principal que s'està provant. Idealment hauria de ser una única línia de codi.21  
3. **Assert (Verificar)**: Es verifica que el resultat coincideix amb l'expectativa (comprovar valors de retorn o canvis d'estat).21

Aquest patró és funcionalment idèntic a l'estructura "Given/When/Then" utilitzada en BDD.1

## **Aïllament de Dependències mitjançant Mocking**

El **mocking** és la tècnica de substituir dependències reals per "dobles de prova" per assegurar que la prova sigui ràpida, determinista i centrada en la lògica interna de la unitat.5

### **Utilitat del Mocking**

* **Aïllar dependències externes**: Permet provar codi que truca a serveis de tercers (com Stripe o una API meteorològica) sense fer una petició de xarxa real, que seria lenta i podria fallar per causes externes.1  
* **Simular comportaments complexos**: Els mocks es poden configurar per retornar errors específics (com un error 500\) per provar com l'aplicació gestiona fallades difícils de provocar en producció.5  
* **Verificar interaccions**: Es pot rastrejar quantes vegades s'ha trucat a una funció i amb quins arguments.6

En Vitest i Jest, s'utilitzen utilitats com vi.fn() o jest.fn() per crear funcions simulades, i vi.mock() o jest.mock() per substituir mòduls sencers.6

## **Test-Driven Development (TDD): El Cicle Vermell-Verd-Refactor**

El TDD és un flux de treball on la prova s'escriu abans que el codi de producció.25 Segueix un cicle estricte de tres fases:

1. **Fase Vermell (Red)**: Escriure una prova que falli per a una nova funcionalitat. Això demostra que la funcionalitat encara no existeix.26  
2. **Fase Verd (Green)**: Escriure el mínim codi necessari per fer que la prova passi. No cal que sigui elegant, només funcional.26  
3. **Refactor**: Netejar el codi, millorant la seva estructura i llegibilitat, assegurant que les proves continuen passant.26

## **Configuració de l'Entorn: Jest/Vitest amb TypeScript**

Configurar un projecte modern requereix integrar TypeScript per garantir la seguretat de tipus.

### **Configuració amb Vitest (Recomanat per a projectes amb Vite)**

Vitest és més ràpid i gestiona TypeScript de forma nativa a través d' esbuild.6

* **Dependències**: npm install \-D vitest.29  
* **Configuració**: Es configura en el fitxer vitest.config.ts. S'activen els globals (globals: true) per no haver d'importar describe i it en cada fitxer.30

### **Configuració amb Jest**

Jest requereix ts-jest per transformar el codi TypeScript.32

* **Dependències**: npm install \-D jest ts-jest @types/jest typescript.34  
* **Configuració**: S'inicialitza amb npx ts-jest config:init, que crea un jest.config.js utilitzant el preset de ts-jest.35

| Característica | Configuració Jest | Configuració Vitest |
| :---- | :---- | :---- |
| **Transpilació** | Requereix ts-jest o Babel. 32 | Nativa via esbuild. 6 |
| **Velocitat** | Més lent en l'inici. 24 | Molt ràpid gràcies a HMR. 6 |
| **TypeScript** | Necessita tipus separats @types/jest. 36 | Nativa; tipus inclosos. 28 |

## **Mètriques de Qualitat: Cobertura de Codi (Code Coverage)**

La cobertura de codi és una mètrica que quantifica quin percentatge del codi font és executat per les proves.37

* **Line Coverage (Cobertura de línies)**: Percentatge de línies de codi executades.37  
* **Branch Coverage (Cobertura de branques)**: Mesura si s'han provat tots els camins possibles en estructures de control com if/else o switch.37

Es generen amb el flag \--coverage en ambdós marcs.37 Matemàticament, la cobertura de branques es defineix com:  
![][image1]  
on ![][image2] és el conjunt de branques executades i ![][image3] el conjunt de totes les branques lògiques.38

## **Prevenint la Regressió en CI/CD**

Una **regressió** és un defecte que apareix quan un canvi nou trenca una funcionalitat que abans funcionava.41 Les proves automatitzades actuen com a "guàrdies" en el pipeline de CI/CD, executant-se en cada commit per assegurar que cap error de regressió arribi a producció.4 Una bona pràctica és escriure una nova prova que falli per a cada error detectat en producció; un cop corregit, aquesta prova garanteix que l'error no tornarà a aparèixer.42

## **Conclusió**

L'adopció de proves automatitzades i metodologies com el TDD permet als equips de desenvolupament mantenir un ritme constant d'innovació sense sacrificar la qualitat. Mitjançant l'ús correcte de la piràmide de proves i l'aïllament de dependències, s'aconsegueix un sistema robust, documentat i resistent al pas del temps.

#### **Obras citadas**

1. The Practical Test Pyramid \- Martin Fowler, fecha de acceso: mayo 3, 2026, [https://martinfowler.com/articles/practical-test-pyramid.html](https://martinfowler.com/articles/practical-test-pyramid.html)  
2. The Testing Pyramid: A Comprehensive Guide \- TestRail, fecha de acceso: mayo 3, 2026, [https://www.testrail.com/blog/testing-pyramid/](https://www.testrail.com/blog/testing-pyramid/)  
3. Automated Testing \- Software Delivery Playbook, fecha de acceso: mayo 3, 2026, [https://docs.developer.tech.gov.sg/docs/software-delivery-playbook/practices/automated-testing](https://docs.developer.tech.gov.sg/docs/software-delivery-playbook/practices/automated-testing)  
4. Regression Testing in CI/CD Pipelines \- Complete Guide \- Virtuoso QA, fecha de acceso: mayo 3, 2026, [https://www.virtuosoqa.com/post/ci-cd-regression-testing](https://www.virtuosoqa.com/post/ci-cd-regression-testing)  
5. How living documentation and user stories acceptance tests can bring project documentation benefits? \- lastminute.com Technology, fecha de acceso: mayo 3, 2026, [https://technology.lastminute.com/living-doc-bdd-cucumber-serenity/](https://technology.lastminute.com/living-doc-bdd-cucumber-serenity/)  
6. Building a Comprehensive Testing Suite: A Week-Long Journey to 92% Coverage \- Medium, fecha de acceso: mayo 3, 2026, [https://medium.com/@jaivalsuthar/building-a-comprehensive-testing-suite-a-week-long-journey-to-92-coverage-1a9f5df8c4e0](https://medium.com/@jaivalsuthar/building-a-comprehensive-testing-suite-a-week-long-journey-to-92-coverage-1a9f5df8c4e0)  
7. What is EDD: The Example-Driven Development Guide \- testRigor AI-Based Automated Testing Tool, fecha de acceso: mayo 3, 2026, [https://testrigor.com/blog/what-is-edd/](https://testrigor.com/blog/what-is-edd/)  
8. Living Documentation | Agility Maturity Cards by Agilitest, fecha de acceso: mayo 3, 2026, [https://www.agilitest.com/cards/living-documentation](https://www.agilitest.com/cards/living-documentation)  
9. Vitest 4.1 is out\!, fecha de acceso: mayo 3, 2026, [https://vitest.dev/blog/vitest-4-1.html](https://vitest.dev/blog/vitest-4-1.html)  
10. A Comprehensive Guide to Automated Regression Testing- Benefits, Tools, and Best Practices \- CloudQA, fecha de acceso: mayo 3, 2026, [https://cloudqa.io/a-comprehensive-guide-to-automated-regression-testing/](https://cloudqa.io/a-comprehensive-guide-to-automated-regression-testing/)  
11. Regression Testing: What it is, why it matters, and how to automate it with CI/CD \- CircleCI, fecha de acceso: mayo 3, 2026, [https://circleci.com/blog/regression-testing-and-how-to-automate-it-with-ci/](https://circleci.com/blog/regression-testing-and-how-to-automate-it-with-ci/)  
12. fecha de acceso: mayo 3, 2026, [https://circleci.com/blog/regression-testing-and-how-to-automate-it-with-ci/\#:\~:text=The%20practical%20answer%20in%20a,when%20the%20failure%20comes%20back.](https://circleci.com/blog/regression-testing-and-how-to-automate-it-with-ci/#:~:text=The%20practical%20answer%20in%20a,when%20the%20failure%20comes%20back.)  
13. Test Pyramid \- Martin Fowler, fecha de acceso: mayo 3, 2026, [https://martinfowler.com/bliki/TestPyramid.html](https://martinfowler.com/bliki/TestPyramid.html)  
14. The Testing Pyramid Decoded: Origins, Evolution, and Best Practices \- Qase, fecha de acceso: mayo 3, 2026, [https://qase.io/blog/the-testing-pyramid-decoded/](https://qase.io/blog/the-testing-pyramid-decoded/)  
15. A Beginner's Guide to Unit Testing with Vitest | Better Stack Community, fecha de acceso: mayo 3, 2026, [https://betterstack.com/community/guides/testing/vitest-explained/](https://betterstack.com/community/guides/testing/vitest-explained/)  
16. Guide to writing integration tests in express js with Jest and Supertest \- DEV Community, fecha de acceso: mayo 3, 2026, [https://dev.to/ali\_adeku/guide-to-writing-integration-tests-in-express-js-with-jest-and-supertest-1059](https://dev.to/ali_adeku/guide-to-writing-integration-tests-in-express-js-with-jest-and-supertest-1059)  
17. Automated Testing with Jest and Supertest in Node.js (Express \+ TypeScript) \- Medium, fecha de acceso: mayo 3, 2026, [https://medium.com/@etosin70/automated-testing-with-jest-and-supertest-in-node-js-express-typescript-953683d3f5fb](https://medium.com/@etosin70/automated-testing-with-jest-and-supertest-in-node-js-express-typescript-953683d3f5fb)  
18. Installation | Playwright, fecha de acceso: mayo 3, 2026, [https://playwright.dev/docs/intro](https://playwright.dev/docs/intro)  
19. What is a Test Automation Approach? \- We are Community, fecha de acceso: mayo 3, 2026, [https://wearecommunity.io/communities/testautomation/articles/7946](https://wearecommunity.io/communities/testautomation/articles/7946)  
20. The Arrange, Act, and Assert (AAA) Pattern in Unit Test Automation \- Semaphore, fecha de acceso: mayo 3, 2026, [https://semaphore.io/blog/aaa-pattern-test-automation](https://semaphore.io/blog/aaa-pattern-test-automation)  
21. goldbergyoni/javascript-testing-best-practices: Comprehensive and exhaustive JavaScript & Node.js testing best practices (August 2025\) \- GitHub, fecha de acceso: mayo 3, 2026, [https://github.com/goldbergyoni/javascript-testing-best-practices](https://github.com/goldbergyoni/javascript-testing-best-practices)  
22. AAA Pattern in TDD with TypeScript | CodeSignal Learn, fecha de acceso: mayo 3, 2026, [https://codesignal.com/learn/courses/foundations-of-tdd-in-typescript-and-jest-the-principles/lessons/aaa-pattern-in-tdd-with-typescript](https://codesignal.com/learn/courses/foundations-of-tdd-in-typescript-and-jest-the-principles/lessons/aaa-pattern-in-tdd-with-typescript)  
23. Mocking | Guide | Vitest, fecha de acceso: mayo 3, 2026, [https://vitest.dev/guide/mocking.html](https://vitest.dev/guide/mocking.html)  
24. Vitest vs Jest | Better Stack Community, fecha de acceso: mayo 3, 2026, [https://betterstack.com/community/guides/scaling-nodejs/vitest-vs-jest/](https://betterstack.com/community/guides/scaling-nodejs/vitest-vs-jest/)  
25. Test-Driven Development (TDD) in frontend code. \- DEV Community, fecha de acceso: mayo 3, 2026, [https://dev.to/fajarriv/test-driven-development-tdd-in-frontend-code-flc](https://dev.to/fajarriv/test-driven-development-tdd-in-frontend-code-flc)  
26. Set up a test-driven development flow in VS Code, fecha de acceso: mayo 3, 2026, [https://code.visualstudio.com/docs/copilot/guides/test-driven-development-guide](https://code.visualstudio.com/docs/copilot/guides/test-driven-development-guide)  
27. Understanding the TDD Cycle: Red-Green-Refactor | by Lelianto Eko Pradana | Medium, fecha de acceso: mayo 3, 2026, [https://medium.com/@lelianto.eko/understanding-the-tdd-cycle-red-green-refactor-c449db8cc5de](https://medium.com/@lelianto.eko/understanding-the-tdd-cycle-red-green-refactor-c449db8cc5de)  
28. Jest vs Vitest: Which Test Runner Should You Use in 2025? | by Ruver Dornelas \- Medium, fecha de acceso: mayo 3, 2026, [https://medium.com/@ruverd/jest-vs-vitest-which-test-runner-should-you-use-in-2025-5c85e4f2bda9](https://medium.com/@ruverd/jest-vs-vitest-which-test-runner-should-you-use-in-2025-5c85e4f2bda9)  
29. Getting Started | Guide \- Vitest, fecha de acceso: mayo 3, 2026, [https://vitest.dev/guide/](https://vitest.dev/guide/)  
30. React Testing Setup: Vitest \+ TypeScript \+ React Testing Library \- DEV Community, fecha de acceso: mayo 3, 2026, [https://dev.to/kevinccbsg/react-testing-setup-vitest-typescript-react-testing-library-42c8](https://dev.to/kevinccbsg/react-testing-setup-vitest-typescript-react-testing-library-42c8)  
31. Set up Vitest in UI Package | Vercel Academy, fecha de acceso: mayo 3, 2026, [https://vercel.com/academy/production-monorepos/set-up-vitest](https://vercel.com/academy/production-monorepos/set-up-vitest)  
32. Installation | ts-jest \- GitHub Pages, fecha de acceso: mayo 3, 2026, [https://kulshekhar.github.io/ts-jest/docs/getting-started/installation](https://kulshekhar.github.io/ts-jest/docs/getting-started/installation)  
33. How to Configure Jest for TypeScript \- OneUptime, fecha de acceso: mayo 3, 2026, [https://oneuptime.com/blog/post/2026-02-02-jest-typescript-configuration/view](https://oneuptime.com/blog/post/2026-02-02-jest-typescript-configuration/view)  
34. The Complete Guide to Configuring Jest with TypeScript, Express and ESM in 2025, fecha de acceso: mayo 3, 2026, [https://medium.com/@supunprasad009/the-complete-guide-to-configuring-jest-with-typescript-express-and-esm-in-2025-c67644b82213](https://medium.com/@supunprasad009/the-complete-guide-to-configuring-jest-with-typescript-express-and-esm-in-2025-c67644b82213)  
35. Configuring Jest for Typescript Unit Tests \- DEV Community, fecha de acceso: mayo 3, 2026, [https://dev.to/ghostaram/configuring-jest-for-typescript-unit-tests-4iag](https://dev.to/ghostaram/configuring-jest-for-typescript-unit-tests-4iag)  
36. Setting Up and Mastering Testing in TypeScript with Jest | CodeSignal Learn, fecha de acceso: mayo 3, 2026, [https://codesignal.com/learn/courses/foundations-of-tdd-in-typescript-and-jest-the-principles/lessons/setting-up-and-mastering-testing-in-typescript-with-jest](https://codesignal.com/learn/courses/foundations-of-tdd-in-typescript-and-jest-the-principles/lessons/setting-up-and-mastering-testing-in-typescript-with-jest)  
37. Understanding the Jest Coverage Report: A Complete Guide | by Aakanksha \- Medium, fecha de acceso: mayo 3, 2026, [https://medium.com/walmartglobaltech/understanding-the-jest-coverage-report-a-complete-guide-966733d6f730](https://medium.com/walmartglobaltech/understanding-the-jest-coverage-report-a-complete-guide-966733d6f730)  
38. Test Coverage Metrics: Lines, Branches, Conditions, and Paths | Lead With Skills, fecha de acceso: mayo 3, 2026, [https://www.leadwithskills.com/blogs/test-coverage-metrics-lines-branches-conditions-paths](https://www.leadwithskills.com/blogs/test-coverage-metrics-lines-branches-conditions-paths)  
39. What Is Branch Coverage and What Does It Really Tell You? | LinearB Blog, fecha de acceso: mayo 3, 2026, [https://linearb.io/blog/what-is-branch-coverage](https://linearb.io/blog/what-is-branch-coverage)  
40. Coverage | Guide \- Vitest, fecha de acceso: mayo 3, 2026, [https://vitest.dev/guide/coverage](https://vitest.dev/guide/coverage)  
41. Regression Testing: Definition, Types, and Tools \- GitHub, fecha de acceso: mayo 3, 2026, [https://github.com/resources/articles/regression-testing-definition-types-and-tools](https://github.com/resources/articles/regression-testing-definition-types-and-tools)  
42. Automated Regression Testing: A Complete Introduction \- Testim, fecha de acceso: mayo 3, 2026, [https://www.testim.io/blog/automated-regression-testing/](https://www.testim.io/blog/automated-regression-testing/)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAzCAYAAAAq0lQuAAAAl0lEQVR4Xu3DsQkAAAgDsP7/tP5Q3EwgCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADvzFEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAzgJoWRHvnEqHbQAAAABJRU5ErkJggg==>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAYCAYAAAAlBadpAAAAy0lEQVR4Xu2SMQ8BURCER6XSqiVahd8gWr3/4g8olCqVH6KlUGkQnUonR0hEEGaz7708e+/UivuSSS4zs5fbzQElI+pMvZ1u1JF6RF7Dl4vwRcsM6jdtECOFuTVJB5qtbeDpQwtdG5AJNJsaP7BB+pOFonUCqUKbelJ74+eQQbnwklpRd+dV41IKv68cJmbr/J/skC4NoX7dBjGpfYUr1K/YIEYKC2ui+KWBAbTQswHyw+F5TF2oDHrlE/XyoaMFHThA//fad1zy53wAhPQ9J2j9tisAAAAASUVORK5CYII=>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAYCAYAAADzoH0MAAAAyUlEQVR4XmNgGAXooAWIPwLxfyj+DsTvgfgDEP+Fij2Dq8YDYAagAykGiPgXdAl0AFK0CV0QCnAZDgd+DBAFBugSQCDIgPAaTnCWAbcNMNuZ0CWQAUyRMhRrAHE/VGwlkjqcAKRwHxC7ALEzlI6Dim9FUocVwPxviC4BBOwMELm76BLI4DwDbv+DAMEYIKSAkDxYcge6IBTAUqgcugQMFDFAFJiiiasD8U+onBmaHBh0APEvIP7HgHAiCIP4fxgggRYFVz0KhiMAALVtPQqXHT85AAAAAElFTkSuQmCC>