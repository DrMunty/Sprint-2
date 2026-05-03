# **Governança de la seguretat i la mantenibilitat en arquitectures web: Un marc integral d'anàlisi de riscos, complexitat i deute tècnic**

L'evolució de l'enginyeria de programari moderna ha transformat la naturalesa mateixa de la construcció d'aplicacions web, passant d'un model de desenvolupament artesanal i centralitzat a un ecosistema d'assemblatge modular i distribuït. En aquest context, la integritat d'una aplicació ja no depèn exclusivament del codi escrit "in-house", sinó de la robustesa d'una vasta xarxa de dependències de tercers i de la claredat estructural d'una arquitectura que ha de ser sostenible en el temps. La convergència de la seguretat d'aplicacions (AppSec) i la qualitat del codi ha donat lloc a un paradigma on la mantenibilitat i la seguretat són dues cares de la mateixa moneda: un codi complex és, per definició, un codi difícil de protegir i propens a errors catastròfics.1

## **La criticitat de l'escaneig de dependències en el desenvolupament modern**

En el món interconnectat del desenvolupament web contemporani, la velocitat de lliurament és un factor competitiu determinant. Per aconseguir-la, els desenvolupadors confien massivament en llibreries i frameworks de codi obert. Segons dades de la indústria, més del 90% de les aplicacions modernes incorporen components de codi obert per accelerar el cicle de vida del desenvolupament (SDLC).4 No obstant això, aquesta dependència externa introdueix un risc sistèmic que pot comprometre tota l'arquitectura si no es gestiona de manera proactiva.

### **Riscos inherents a les llibreries de tercers**

L'ús de codi extern implica que la seguretat de l'aplicació depèn directament de la seguretat dels components que utilitza. Si es descobreix una vulnerabilitat en una llibreria, qualsevol aplicació que la integri esdevé vulnerable a atacs que podrien permetre des de l'execució de codi remot (RCE) fins a la filtració massiva de dades.6 Un dels aspectes més perillosos és la naturalesa de les dependències transitives: aquelles llibreries que les nostres dependències directes utilitzen internament.5 Aquest efecte en cascada crea una superfície d'atac sovint invisible per als desenvolupadors que no utilitzen eines d'escaneig automatitzades.  
Els riscos es poden categoritzar en diverses dimensions que afecten la continuïtat del negoci i la integritat del sistema. Les llibreries obsoletes o sense manteniment representen una de les amenaces més comunes, ja que manquen de pedaços per a amenaces modernes.7 A més, existeix el risc del compromís de comptes de mantenidors, on atacants guanyen control de paquets legítims per injectar codi maliciós en actualitzacions oficials, com s'ha vist en diversos incidents documentats en repositoris com NPM.4

| Tipus de Risc en Dependències | Descripció de l'Impacte | Exemple de Vulnerabilitat |
| :---- | :---- | :---- |
| Vulnerabilitats conegudes (CVE) | Errors públics que els atacants poden explotar fàcilment.6 | Log4Shell en Apache Log4j.7 |
| Dependències transitives | Riscos heretats de llibreries de segon o tercer nivell.5 | Re-DoS en la llibreria acorn.8 |
| Paquets maliciosos / Spam | Injecció de codi directament en els repositoris públics.4 | Atacs de confusió de dependències.9 |
| Incompatibilitat de llicències | Riscos legals per l'ús de components amb llicències restrictives.5 | Ús de codi GPL en productes privats.5 |

### **Mecanismes d'operació de l'OWASP Dependency-Check**

Per contrarestar aquests riscos, l'OWASP Dependency-Check s'ha consolidat com una eina essencial de Software Composition Analysis (SCA).4 La seva funció principal és identificar les dependències d'un projecte i determinar si contenen vulnerabilitats públiques conegudes mitjançant la comparació amb el National Vulnerability Database (NVD).4  
El procés d'anàlisi s'inicia amb la recollida d'evidències a partir del codi, fitxers de configuració i metadades del projecte. Aquestes evidències (com el nom del proveïdor, el producte i la versió) s'utilitzen per generar identificadors de Common Platform Enumeration (CPE).4 Una vegada establert el CPE, l'eina cerca entrades de Common Vulnerabilities and Exposures (CVE) associades en el repositori del NVD.4 Els resultats es sintetitzen en informes (HTML o XML) que detallen la severitat de les vulnerabilitats utilitzant el sistema de puntuació CVSS, permetent als equips de seguretat prioritzar les correccions basant-se en l'impacte potencial.6

## **Comparativa estratègica: SAST vs DAST**

Dins del marc de la seguretat d'aplicacions web, les metodologies de prova s'han dividit tradicionalment en dos grans enfocaments: l'anàlisi estàtica (SAST) i l'anàlisi dinàmica (DAST). Comprendre les seves diferències és vital per implementar una estratègia de "Defense in Depth" eficaç.

### **SAST: Static Application Security Testing**

El SAST es defineix com una metodologia de "caixa blanca" que analitza el codi font, el bytecode o els binaris de l'aplicació sense necessitat d'executar el programa.10 El seu objectiu principal és identificar defectes de codificació i vulnerabilitats estructurals en les fases inicials del SDLC, una pràctica coneguda com "shift-left".11 Al tenir visibilitat total de la lògica interna, el SAST pot rastrejar el flux de dades i detectar problemes com injeccions SQL o desbordaments de memòria abans que el codi s'integri en una versió executable.14  
L'avantatge principal del SAST és la seva capacitat per oferir retroacció immediata al desenvolupador, indicant la línia exacta de codi que requereix correcció.11 Tanmateix, presenta limitacions notables: és altament dependent del llenguatge de programació i sol generar un volum significatiu de falsos positius, ja que analitza rutes de codi que podrien no ser mai accessibles en temps d'execució.12

### **DAST: Dynamic Application Security Testing**

Per la seva banda, el DAST és una metodologia de "caixa negra" que avalua l'aplicació des de l'exterior mentre aquesta es troba en execució.10 No requereix accés al codi font i simula el comportament d'un atacant real per identificar vulnerabilitats en els punts d'entrada exposats, com APIs, interfícies web i serveis de xarxa.12 El DAST és especialment eficaç per detectar errors de configuració del servidor, problemes d'autenticació i vulnerabilitats que només es manifesten quan tots els components del sistema interactuen en un entorn real.13  
A diferència del SAST, el DAST és independent del llenguatge de programació, el que el fa ideal per analitzar sistemes heterogenis o aplicacions de tercers de les quals no es té el codi.12 No obstant això, es realitza generalment en les etapes finals del desenvolupament, el que pot fer que la correcció dels errors trobats sigui més costosa i complexa.11

| Dimensió de Comparació | SAST (Estàtic) | DAST (Dinàmic) |
| :---- | :---- | :---- |
| **Accés al codi** | Requereix codi font o binaris.10 | No requereix accés al codi.10 |
| **Punt d'execució** | No requereix execució.11 | Requereix una aplicació corrent.14 |
| **Etapa del SDLC** | Inicial (Desenvolupament/Build).11 | Final (Testing/Staging/Producció).11 |
| **Tipus de defectes** | Errors estructurals i de lògica.13 | Errors de runtime i configuració.13 |
| **Precisió** | Molts falsos positius.15 | Pocs falsos positius (valida execució).13 |
| **Exemple d'ús** | Escanejar el codi en el commit.13 | Pentesting automatitzat en staging.15 |

L'estat de l'art en seguretat aconsella un enfocament híbrid. El SAST actua com una eina de prevenció que educa els desenvolupadors, mentre que el DAST serveix com un mecanisme de verificació final que garanteix que les defenses implementades funcionen correctament en l'entorn de producció.12

## **Complexitat Ciclomàtica: Fonaments matemàtics i aplicació pràctica**

La Complexitat Ciclomàtica (CC) és una de les mètriques més influents en l'enginyeria de programari per mesurar l'estabilitat i la testabilitat d'un mòdul.16 Desenvolupada per Thomas J. McCabe en 1976, aquesta mètrica quantifica el nombre de camins linealment independents a través del flux de control d'un programa.1 Una complexitat elevada és un indicador directe de codi "fràgil", difícil d'entendre i extremadament propens a contenir errors de regressió durant el manteniment.17

### **El càlcul de la mètrica**

La base teòrica de la CC es troba en la teoria de grafs. Qualsevol programa es pot representar com un graf de flux de control (CFG), on cada node representa un bloc d'instruccions seqüencials i cada aresta representa una transferència de control entre aquests blocs.1 La fórmula matemàtica fonamental és:  
![][image1]  
En aquesta expressió, ![][image2] representa la complexitat ciclomàtica, ![][image3] és el nombre d'arestes del graf, ![][image4] el nombre de nodes i ![][image5] el nombre de components connectats (que per a una funció o mètode individual sempre és igual a 1).1  
Per facilitar l'aplicació diària sense haver de dibuixar grafs complexos, McCabe va demostrar que per a un programa amb un únic punt d'entrada i un de sortida, la complexitat és equivalent a:  
![][image6]  
On els punts de decisió són paraules clau com if, while, for, case i operadors booleans (en la variant de complexitat estricta).19 Per exemple, una funció amb tres estructures if i un bucle for tindria una complexitat de ![][image7].

### **Llindars de risc i governança del codi**

La interpretació dels valors de CC és crucial per establir "Quality Gates" en les organitzacions. Encara que McCabe va suggerir originalment un límit de 10 per a funcions individuals, la indústria ha adaptat aquests valors segons el risc acceptable per a cada tipus de sistema.16

| Rang de Complexitat | Classificació del Risc | Acció Recomanada |
| :---- | :---- | :---- |
| 1 – 10 | Baix | Mòdul simple, altament testable i mantenible.16 |
| 11 – 20 | Moderat | Mòdul més complex. Requereix revisió i proves extenses.16 |
| 21 – 50 | Alt | Mòdul complex, difícil de comprendre. Cal refactorització.16 |
| \> 50 | Molt Alt / Perillós | Codi inestable i impossible de testar. Considerat un error de disseny.16 |

Un valor elevat de CC no només indica risc d'error, sinó que defineix el nombre mínim de casos de prova necessaris per aconseguir una cobertura completa de branques.1 Si una funció té una CC de 25, es necessiten almenys 25 tests unitaris diferents per assegurar que cada camí lògic ha estat executat almenys una vegada.2

## **Gestió del deute tècnic amb SonarQube i el model SQALE**

El deute tècnic és una metàfora que descriu les conseqüències a llarg termini de prendre dreceres en el disseny o la codificació per complir amb terminis immediats.25 Aquest "deute" genera "interessos" en forma d'esforç addicional cada vegada que s'ha de modificar o ampliar el sistema.25 SonarQube s'ha convertit en l'estàndard industrial per mesurar i gestionar aquest fenomen mitjançant el mètode SQALE (Software Quality Assessment based on Lifecycle Expectations).26

### **Quantificació de l'esforç de remediació**

SonarQube tradueix els problemes de qualitat (code smells) en temps estimat de treball.28 Cada regla de l'eina té assignat un esforç de remediació (per exemple, 5 minuts per eliminar un codi comentat, 30 minuts per refactoritzar una funció complexa).27 El sumatori de tots aquests temps dóna com a resultat l'índex de deute tècnic total de l'aplicació.28  
Per oferir una visió més normalitzada, l'eina utilitza el "Technical Debt Ratio", que és la relació entre el cost de fixar el sistema i el cost estimat de desenvolupar-lo des de zero.27 El cost de desenvolupament se sol basar en una mètrica de 30 minuts per línia de codi (LOC) per defecte.27  
![][image8]

### **Qualificacions de mantenibilitat i Quality Gates**

SonarQube assigna una lletra (A-E) segons el ràtio de deute tècnic, facilitant la interpretació per part dels gestors de projecte.28

| Rating | Ràtio de Deute | Interpretació |
| :---- | :---- | :---- |
| **A** | 0 \- 5% | Qualitat òptima. El deute és insignificant.28 |
| **B** | 6 \- 10% | Qualitat bona. Es recomana monitoratge.28 |
| **C** | 11 \- 20% | Qualitat mitjana. Cal planificar refactoritzacions.28 |
| **D** | 21 \- 50% | Qualitat baixa. El manteniment és costós i lent.28 |
| **E** | \> 50% | Qualitat crítica. El sistema és insostenible.28 |

La clau per a una gestió efectiva és el concepte de "Codi Nou". SonarQube permet configurar Quality Gates que fallen si el codi introduït en un "Pull Request" recent té una qualificació inferior a A, assegurant que el deute tècnic total del projecte no augmenti amb el temps.27

## **Vulnerabilitats de l'OWASP Top 10 i detecció automatitzada**

L'OWASP Top 10 representa el consens global sobre els riscos de seguretat més crítics per a les aplicacions web.32 La versió de 2021 va introduir canvis significatius, movent l'enfocament de vulnerabilitats tècniques puntuals cap a categories més àmplies com el disseny insegur o les fallades d'integritat.9

### **Categories i estratègies de detecció**

La detecció d'aquestes vulnerabilitats requereix una combinació d'eines, ja que cap tecnologia individual pot cobrir tot l'espectre de riscos.9

| Categoria OWASP 2021 | Focus del Risc | Eines de Detecció Primàries |
| :---- | :---- | :---- |
| **A01: Broken Access Control** | Fallades en els permisos d'usuari (IDOR, escalada de privilegis).35 | DAST per a runtime, IAST per a lògica de tokens.9 |
| **A02: Cryptographic Failures** | Exposició de dades sensibles per xifratge feble o inexistent.35 | SAST per a claus hardcoded i algorismes obsolets.9 |
| **A03: Injection** | Entrada de dades que altera la consulta original (SQL, NoSQL, OS).9 | SAST (taca de dades) i DAST (payloads d'injecció).9 |
| **A04: Insecure Design** | Manca de controls de seguretat en la fase de disseny.32 | Revisió humana i Threat Modeling (difícil per a eines).9 |
| **A05: Security Misconfiguration** | Ports oberts, capçaleres insegures o comptes per defecte.33 | DAST per a la superfície d'atac i SAST per a IaC.9 |
| **A06: Vulnerable Components** | Ús de llibreries amb vulnerabilitats conegudes.33 | SCA (Dependency-Check, Snyk).6 |
| **A07: Ident. & Auth. Failures** | Fallades en la gestió de sessions o seguretat de contrasenyes.33 | DAST per a atacs de sessió i configuració d'auth.9 |
| **A08: Integrity Failures** | Actualitzacions sense verificar o deserialització insegura.33 | SCA per a integritat de paquets i SAST per a deserialització.9 |
| **A09: Logging & Monitoring** | Incapacitat per detectar atacs en curs per falta de logs.33 | SAST per verificar la presència de trucades a logs.9 |
| **A10: SSRF** | Peticions des del servidor cap a recursos interns no autoritzats.33 | SAST per a flux de dades i DAST per a sondatge de xarxa.9 |

Les eines de SAST com SonarQube són extremadament potents per detectar l'A02 (Criptografia) i l'A03 (Injecció) mitjançant l'anàlisi de "taint" (seguiment de dades brutes des de l'entrada fins a l'execució).9 Per contra, les eines de DAST com OWASP ZAP o Burp Suite són superiors per detectar l'A01 (Access Control) en interactuar directament amb les funcionalitats d'usuari en temps real.9

## **Impacte de la complexitat en els costos i la probabilitat d'errors**

La relació entre la complexitat del codi i la probabilitat d'introduir errors és exponencial. Una funció amb una complexitat de 50 no és només cinc vegades més difícil de mantenir que una de 10; és ordres de magnitud més arriscada a causa de la càrrega cognitiva que imposa al desenvolupador.3

### **Correlació amb l'estabilitat i la mantenibilitat**

Quan la complexitat ciclomàtica augmenta, el codi esdevé més difícil de testar, el que directament redueix la confiança en les versions lliurades.1 Els costos de manteniment es disparen per tres raons principals:

1. **Temps de diagnòstic:** Identificar on es produeix un error en una funció amb 20 camins diferents és molt més lent que en una funció lineal.2  
2. **Cicles de QA:** El nombre de test cases requerits per a una cobertura segura creix amb cada nou punt de decisió.2  
3. **Por a la refactorització:** Quan el codi és massa complex, els desenvolupadors eviten modificar-lo per por a trencar funcionalitats no documentades, el que porta a una "paràlisi estructural" que augmenta el deute tècnic.2

Així mateix, el codi complex és inherentment menys segur. La seguretat requereix predictibilitat; si un desenvolupador no pot visualitzar tots els possibles camins d'execució d'una funció, és probable que deixi rutes obertes que un atacant podria aprofitar per saltar-se controls d'accés o validacions de dades.3

## **Configuració de SonarQube i anàlisi contínua**

Per garantir una qualitat sostinguda, l'anàlisi no pot ser un esdeveniment aïllat, sinó una part integrada del pipeline de CI/CD.

### **El fitxer sonar-project.properties**

La configuració d'un projecte s'articula mitjançant un fitxer de propietats a l'arrel del repositori.37 Aquest fitxer defineix els paràmetres d'identificació i els abastos de l'anàlisi.

Properties

\# Identificació del projecte  
sonar.projectKey=org.empresa:aplicacio-web  
sonar.projectName=Portal d'Usuari Web  
sonar.projectVersion=2.1.4

\# Camins de codi i anàlisi  
sonar.sources=src/main/js  
sonar.tests=src/test/js  
sonar.sourceEncoding=UTF-8

\# Exclusions i informes de cobertura  
sonar.exclusions=\*\*/node\_modules/\*\*, \*\*/dist/\*\*  
sonar.javascript.lcov.reportPaths=coverage/lcov.info

### **Configuració del Quality Gate**

Un Quality Gate és el mecanisme que atura el desplegament si el codi no compleix els estàndards mínims.38 SonarQube recomana la configuració "Sonar Way", que se centra en el Codi Nou amb els següents llindars 31:

* **New Reliability Rating:** A (zero bugs nous).  
* **New Security Rating:** A (zero vulnerabilitats noves).  
* **New Security Hotspots Reviewed:** 100%.  
* **New Code Coverage:** \> 80%.  
* **New Code Duplication:** \< 3%.

Aquesta configuració obliga l'equip a mantenir l'excel·lència en cada commit, evitant la degradació gradual del sistema.31

## **Estratègies de refactorització i millora de mètriques**

Davant d'un diagnòstic d'alta complexitat o deute tècnic elevat, l'equip de desenvolupament ha d'aplicar patrons de refactorització sistemàtics.

### **Patrons clau per reduir la complexitat**

1. **Extract Method (Extracció de Mètode):** Identificar blocs de codi dins d'una funció gran que realitzen una sub-tasca específica i moure'ls a una nova funció privada.3 Això redueix la CC de la funció pare i facilita la reutilització.  
2. **Replace Nested Conditional with Guard Clauses (Clàusules de Guarda):** En lloc d'utilitzar una estructura de if niats que augmenta la profunditat del graf, utilitzar retorns anticipats (return) per gestionar els casos d'error o excepcions al principi de la funció.3  
3. **Strategy Pattern (Patró Estratègia):** Quan un switch o una sèrie de if-else creixen excessivament per gestionar diferents comportaments segons el tipus d'objecte, delegar aquesta lògica a classes o funcions especialitzades mitjançant polimorfisme.2  
4. **Simplify Boolean Expressions (Simplificació Booleana):** Descompondre condicions complexes en variables booleanes amb noms que expliquin la intenció del negoci, reduint la càrrega cognitiva i el risc d'errors en la lògica de control.36

L'ús combinat d'eines com radon per a Python, eslint amb límits de complexitat per a JavaScript, i SonarQube per a una visió holística, permet als equips de desenvolupament mantenir un cicle de retroacció constant que garanteix la salut i la seguretat del programari a llarg termini.3

## **Síntesi de la governança de seguretat i qualitat**

La gestió moderna de les aplicacions web exigeix un compromís innegociable amb la visibilitat i la mesura. L'escaneig de dependències no és una opció, sinó una necessitat crítica davant d'una cadena de subministrament cada vegada més atacada.4 De la mateixa manera, la complexitat ciclomàtica i el deute tècnic no són meres xifres acadèmiques, sinó predictors directes de la supervivència d'un projecte en el món real.1  
L'estratègia d'èxit passa per integrar el SAST i el DAST de manera harmònica, utilitzar SonarQube per imposar estàndards de mantenibilitat rigorosos i educar els desenvolupadors en l'ús de patrons de refactorització que mantinguin la complexitat sota control.12 Només mitjançant aquesta disciplina tecnològica es pot transformar el deute tècnic d'un passiu perillós a un actiu gestionable que permeti la innovació segura i constant.

#### **Obras citadas**

1. Cyclomatic Complexity Guide | How To Calculate & Test | Sonar, fecha de acceso: mayo 3, 2026, [https://www.sonarsource.com/resources/library/cyclomatic-complexity/](https://www.sonarsource.com/resources/library/cyclomatic-complexity/)  
2. Cyclomatic Complexity: Every Programmer Should Know | In-Com, fecha de acceso: mayo 3, 2026, [https://www.in-com.com/blog/cyclomatic-complexity/](https://www.in-com.com/blog/cyclomatic-complexity/)  
3. Unraveling Cyclomatic Complexity: A Guide to Simplifying Your Code | HackerOne, fecha de acceso: mayo 3, 2026, [https://www.hackerone.com/blog/unraveling-cyclomatic-complexity-guide-simplifying-your-code](https://www.hackerone.com/blog/unraveling-cyclomatic-complexity-guide-simplifying-your-code)  
4. A Deep Dive Into OWASP Dependency-Check \- Codacy | Blog, fecha de acceso: mayo 3, 2026, [https://blog.codacy.com/owasp-dependency-check](https://blog.codacy.com/owasp-dependency-check)  
5. Improve Your Code Security with Dependency Scanning | by Tamer Benhassan | Medium, fecha de acceso: mayo 3, 2026, [https://medium.com/@tamerbenhassan/improve-your-code-security-with-dependency-scanning-47f509111261](https://medium.com/@tamerbenhassan/improve-your-code-security-with-dependency-scanning-47f509111261)  
6. OWASP Dependency-Check: How It Works, Benefits, and Pros/Cons | HackerOne, fecha de acceso: mayo 3, 2026, [https://www.hackerone.com/knowledge-center/owasp-dependency-check-how-it-works-benefits-and-proscons](https://www.hackerone.com/knowledge-center/owasp-dependency-check-how-it-works-benefits-and-proscons)  
7. A Guide to Third-Party Dependency Security for Developers, fecha de acceso: mayo 3, 2026, [https://www.securityjourney.com/post/a-guide-to-third-party-dependency-security-for-developers](https://www.securityjourney.com/post/a-guide-to-third-party-dependency-security-for-developers)  
8. Set up dependency scanning for GitHub Advanced Security \- Azure Repos | Microsoft Learn, fecha de acceso: mayo 3, 2026, [https://learn.microsoft.com/en-us/azure/devops/repos/security/github-advanced-security-dependency-scanning?view=azure-devops](https://learn.microsoft.com/en-us/azure/devops/repos/security/github-advanced-security-dependency-scanning?view=azure-devops)  
9. OWASP Top 10 2025-2026 Tool Coverage Guide \- AppSec Santa, fecha de acceso: mayo 3, 2026, [https://appsecsanta.com/aspm-tools/owasp-top-10-guide](https://appsecsanta.com/aspm-tools/owasp-top-10-guide)  
10. fecha de acceso: mayo 3, 2026, [https://about.gitlab.com/topics/devsecops/sast-vs-dast/\#:\~:text=SAST%20is%20white%2Dbox%20testing,outside%20attacker%20to%20get%20in.\&text=SAST%20tools%20scan%20the%20source,have%20access%20to%20source%20code.](https://about.gitlab.com/topics/devsecops/sast-vs-dast/#:~:text=SAST%20is%20white%2Dbox%20testing,outside%20attacker%20to%20get%20in.&text=SAST%20tools%20scan%20the%20source,have%20access%20to%20source%20code.)  
11. DAST vs SAST: 5 Key Differences, Pros/Cons and How to Choose | CyCognito, fecha de acceso: mayo 3, 2026, [https://www.cycognito.com/learn/application-security/dast-vs-sast/](https://www.cycognito.com/learn/application-security/dast-vs-sast/)  
12. SAST vs DAST: How to Use Both Testing Tools for App Security \- Wiz, fecha de acceso: mayo 3, 2026, [https://www.wiz.io/academy/application-security/sast-vs-dast](https://www.wiz.io/academy/application-security/sast-vs-dast)  
13. SAST vs DAST: What's the difference? \- Cycode, fecha de acceso: mayo 3, 2026, [https://cycode.com/blog/sast-vs-dast-guide/](https://cycode.com/blog/sast-vs-dast-guide/)  
14. SAST vs DAST: Key Differences, Use Cases and When to Use Each \- Checkmarx, fecha de acceso: mayo 3, 2026, [https://checkmarx.com/learn/sast/sast-vs-dast/](https://checkmarx.com/learn/sast/sast-vs-dast/)  
15. SAST vs. DAST \- GitLab, fecha de acceso: mayo 3, 2026, [https://about.gitlab.com/topics/devsecops/sast-vs-dast/](https://about.gitlab.com/topics/devsecops/sast-vs-dast/)  
16. Cyclomatic complexity \- Wikipedia, fecha de acceso: mayo 3, 2026, [https://en.wikipedia.org/wiki/Cyclomatic\_complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity)  
17. Cyclomatic complexity \- Johner Institute, fecha de acceso: mayo 3, 2026, [https://blog.johner-institute.com/iec-62304-medical-software/cyclomatic-complexity/](https://blog.johner-institute.com/iec-62304-medical-software/cyclomatic-complexity/)  
18. Cyclomatic Complexity: A Complete Guide \- Codacy | Blog, fecha de acceso: mayo 3, 2026, [https://blog.codacy.com/cyclomatic-complexity](https://blog.codacy.com/cyclomatic-complexity)  
19. What Is Cyclomatic Complexity and How to Calculate Cyclomatic ..., fecha de acceso: mayo 3, 2026, [https://www.perforce.com/blog/qac/what-cyclomatic-complexity](https://www.perforce.com/blog/qac/what-cyclomatic-complexity)  
20. Cyclomatic Complexity Definition, Calculation & Examples \- Jellyfish, fecha de acceso: mayo 3, 2026, [https://jellyfish.co/library/cyclomatic-complexity/](https://jellyfish.co/library/cyclomatic-complexity/)  
21. McCabe Cyclomatic Complexity | Klocwork 2024.4, fecha de acceso: mayo 3, 2026, [https://help.klocwork.com/2024/en-us/concepts/mccabecyclomaticcomplexity.htm](https://help.klocwork.com/2024/en-us/concepts/mccabecyclomaticcomplexity.htm)  
22. Understanding McCabe Cyclomatic Complexity \- SciTools Support, fecha de acceso: mayo 3, 2026, [https://support.scitools.com/support/solutions/articles/70000582297-understanding-mccabe-cyclomatic-complexity](https://support.scitools.com/support/solutions/articles/70000582297-understanding-mccabe-cyclomatic-complexity)  
23. Cyclomatic Complexity (McCabe) Metric | GMetrics \- GitHub Pages, fecha de acceso: mayo 3, 2026, [https://dx42.github.io/gmetrics/metrics/CyclomaticComplexityMetric.html](https://dx42.github.io/gmetrics/metrics/CyclomaticComplexityMetric.html)  
24. How to Reduce Cyclomatic Complexity | Augment Code, fecha de acceso: mayo 3, 2026, [https://www.augmentcode.com/learn/how-to-reduce-cyclomatic-complexity](https://www.augmentcode.com/learn/how-to-reduce-cyclomatic-complexity)  
25. What is Technical Debt? Causes, Types & Definition Guide \- Sonar, fecha de acceso: mayo 3, 2026, [https://www.sonarsource.com/resources/library/technical-debt/](https://www.sonarsource.com/resources/library/technical-debt/)  
26. Manage technical debt with the SQALE Plugin for SonarQube Server \- bitegarden, fecha de acceso: mayo 3, 2026, [https://www.bitegarden.com/technical-debt-management-sqale](https://www.bitegarden.com/technical-debt-management-sqale)  
27. Understanding measures and metrics | SonarQube Server | Sonar ..., fecha de acceso: mayo 3, 2026, [https://docs.sonarsource.com/sonarqube-server/latest/user-guide/code-metrics/metrics-definition/](https://docs.sonarsource.com/sonarqube-server/latest/user-guide/code-metrics/metrics-definition/)  
28. Understanding measures and metrics | SonarQube Server 2025.1 LTA, fecha de acceso: mayo 3, 2026, [https://docs.sonarsource.com/sonarqube-server/2025.1/user-guide/code-metrics/metrics-definition](https://docs.sonarsource.com/sonarqube-server/2025.1/user-guide/code-metrics/metrics-definition)  
29. Metric Definitions | SonarQube Docs, fecha de acceso: mayo 3, 2026, [https://scm.thm.de/sonar/documentation/user-guide/metric-definitions/](https://scm.thm.de/sonar/documentation/user-guide/metric-definitions/)  
30. Metric definitions | SonarQube Server 9.8 \- Sonar Documentation, fecha de acceso: mayo 3, 2026, [https://docs.sonarsource.com/sonarqube-server/9.8/user-guide/metric-definitions](https://docs.sonarsource.com/sonarqube-server/9.8/user-guide/metric-definitions)  
31. Quality gates | SonarQube Server 10.8 \- Sonar Documentation, fecha de acceso: mayo 3, 2026, [https://docs.sonarsource.com/sonarqube-server/10.8/instance-administration/analysis-functions/quality-gates](https://docs.sonarsource.com/sonarqube-server/10.8/instance-administration/analysis-functions/quality-gates)  
32. OWASP Top 10:2021, fecha de acceso: mayo 3, 2026, [https://owasp.org/Top10/2021/](https://owasp.org/Top10/2021/)  
33. Introduction \- OWASP Top 10:2021, fecha de acceso: mayo 3, 2026, [https://owasp.org/Top10/2021/A00\_2021\_Introduction/](https://owasp.org/Top10/2021/A00_2021_Introduction/)  
34. OWASP Top 10 2021 vs. 2025: Key Differences Every Security Professional Should Know, fecha de acceso: mayo 3, 2026, [https://www.practical-devsecops.com/owasp-top-10-2021-vs-2025/](https://www.practical-devsecops.com/owasp-top-10-2021-vs-2025/)  
35. What Is the OWASP Top 10 and How Does It Work? \- Black Duck, fecha de acceso: mayo 3, 2026, [https://www.blackduck.com/glossary/what-is-owasp-top-10.html](https://www.blackduck.com/glossary/what-is-owasp-top-10.html)  
36. Best Practices for Reducing Cyclomatic Complexity in Your Code | Article \- BlueOptima, fecha de acceso: mayo 3, 2026, [https://www.blueoptima.com/post/best-practices-for-reducing-cyclomatic-complexity-in-your-code](https://www.blueoptima.com/post/best-practices-for-reducing-cyclomatic-complexity-in-your-code)  
37. SonarScanner CLI | SonarQube Server | Sonar Documentation, fecha de acceso: mayo 3, 2026, [https://docs.sonarsource.com/sonarqube-server/latest/analysis/scan/sonarscanner/](https://docs.sonarsource.com/sonarqube-server/latest/analysis/scan/sonarscanner/)  
38. Quality gate | SonarQube Cloud \- Sonar Documentation, fecha de acceso: mayo 3, 2026, [https://docs.sonarsource.com/sonarqube-cloud/managing-your-projects/project-analysis/changing-quality-gate](https://docs.sonarsource.com/sonarqube-cloud/managing-your-projects/project-analysis/changing-quality-gate)  
39. Quality gates | SonarQube Server 9.8 \- Sonar Documentation, fecha de acceso: mayo 3, 2026, [https://docs.sonarsource.com/sonarqube-server/9.8/user-guide/quality-gates](https://docs.sonarsource.com/sonarqube-server/9.8/user-guide/quality-gates)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAlCAYAAAD/XbWoAAAAb0lEQVR4Xu3BAQ0AAADCoPdPbQ8HFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwZWakAAG38XxaAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAABCUlEQVR4XmNgGAW0BvVA/AWI/0PxWVRpDPCQAaEWpK8YVRoVwBSCMC6gB8S1DBA1xmhyWMETBoSLcYHHQHyMAb8aOPAC4hQg3sKAW8M6KE3IN3BwAkqDwgebBh4gzoWyQfKrkeRwAphBoHACsWWQ5EDgB5R2Z4DIayHJ4QRPkdggTXFI/Hwg5oayQT7C5hMMALI9DYkP0rQQiY/sVZLDEwZAmkCxDALPkCUYIHKr0MSwAnSbYa6xBWIdJHFvqLg2khhO8BKN/4YBovk2mjgop6E7AAMwAvFdBki2QwbLGbBrJhiePUD8AYjfAvFnIP6DJOcDxKFI/K8MCLWfgPg3EFciyY+CUUALAABbjUmZS+msywAAAABJRU5ErkJggg==>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAZCAYAAADuWXTMAAAAzElEQVR4XmNgGAWRQLyFSIwBWIFYHIj/Q7EYEPMAMTcQiwKxORA/gsrhBCDJf+iCSACnZhMGiGQ/ugQSwKkZ5B+QpACSGAsQz0Pif0JiowCYf5HBZSCWRxPDCmCa0TFBYMYAUdiJJKYHFSMIyhkgCj3QxO8isYWBmBGJDwefGTBtAcW9FxL/JxIbBRDyHyih7EMXBAE2BojG0+gSSAAkD4o2DDCBASLphy4BBAEMEDkMJ68C4j8MkOSIHj0gDBL/DcTfgdgAqmcUDC0AACh/OzCQSURoAAAAAElFTkSuQmCC>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAYCAYAAAD3Va0xAAAA3UlEQVR4XmNgGAWkgnlA/BmI/0PxAhRZCPjLgJAHYWdUaVSArBAb2AfEKuiC6IARiLcD8XoGiEFBqNJggMsCFJAPxCZQNi5X/UEXwAbeIrE/MEAM4kMSUwPiTiQ+ToDsAlA4gPg3kcSWATEPEh8rAIXPZjQxdO9h8yoGQA4fZDGQ5m4o/xeSHE7wDl0ACmCu0gbiFjQ5rACXs3czQOTuATEnmhwGYAHiveiCUMDEgBlWWAEzEL8B4pPoEkjgGxB/RxdEBquA+CMDJP2A0g0oL2ED+kCcjS44CkYBEAAABi803bhnVOIAAAAASUVORK5CYII=>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAYCAYAAAAlBadpAAAAoElEQVR4XmNgGAUTgPgjEP+H4u9A/A5NbBVcNQ4AU4gO5Bkg4rvQJZABSMFxdEEowGUwGEQwQCTd0SWAgJOBgOZrDLgl1zNA5ALQJWAAl8mODBDxiegSyACm+QMQvwfiH1D+ZSAWRlKHAWD+TUKXIAbcZMDuZKIALv8SBUAa76ALEgOqGSCa09El8IHJQPyZARKyoHT8FYj/oagYBUMdAABsmDE6TV027AAAAABJRU5ErkJggg==>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAlCAYAAAD/XbWoAAAFVUlEQVR4Xu3dWeitUxjH8WUm85wMnTJckEKEC0KmzC6cxDmJC65wQTJ2iqJEphS5cUEyFcpYOucCZcpMIpL5whAyZnh+/3c9vc//+b9779cejs7f91NPew3vsNY+F+9z1rv2OaUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABM0es1uhxp8YbFa7ljQhuX5rqKHUP7qxZPWjxhcUJon8S3Fs/lxin6xeLv3LiGmWQOd5bm3KNzR0/b5oaevssNAAAsZktL88DdMneYq8r4D/I+VpaF1z8k1adhlgmb5DmsiSaZw1tlvITt1DL6vupfP7VdW6b/lwi5rzT3GzUmAABWuz8t3ra4JLX/YPG7xfmpfZp0z78sfgtte4TytCz2hO2Y3DCGSebwYhkvYRuXEr2+xpnXOOcAADBTn1lcZPF+aNukfs76weVJou5zYC13JWzXWzwT6mtZXGpxm8UGFvdYrFf7dM0ra9m9UJrXuw+Fts1Lc9y5FudY7BL6zrJ42WLD0JadaXFFLefv6SuLC1Ob6J6XW1xnsY/FvaFPc9LYH671ZRY3h744X50XV510/+NqON3/o9LcZ5Bhc3jU4u7Ult1kcVJZmLBtVbq/g1ssPrDYq9bPtrir7S6bWnxYmu/B535x2z3nIIvPS/8kNc+rj3HOAQBgpna32LrMf0jdWD9HPbg+HhGj9id5wrZfae+VE7Y4hndLm6gcX+avzOm452t5hcUjqc9pRXHnWlay4n35M5ej2H5NqntZiYUnX5GSxHy8J4tHdPS5rvl2lUXzd3uHctRnDrnslBznYzxhO9zi8VqO30E+vqvsf35yf/08ILT9aLFuLevzzdA3SNf4RxnnHAAAVgt/SD1WP48NbbNyWSj/Wpr7xYRNK1Fxr5JWmnxMS0JZYnnfVP8klHcqbZ+SIP0oIVLf9jVWlCaZiU4sC78Xr99emhUkPz8fJ1qRiuNRgtNnTktSfVBZtPqktjx2N+kc1LZDqH9R2oQtfn9+/un1s0uex8oyfz9lTPrzNXJdtrPYP4SOifU920MH6rouAAD/GSUsTg+puOFfdX91NYheVQ6LzdpDO+lHDZHuGVeRtEoWkxu9DvSHqX5dmh/2Tg/lWI/X0Gs379P89bo0GvWwvrUsPMbr2rSuV8zD6J5xPPrO/XwlG4PmNGy+eTx69Sprl6bvsLZrzqRz0LHxFbISNiX43pfpRwJd7dLV/kBp22Pylo/N9S59jsnGOQcAgJnRhn+nh5T2ecX6rGkFLcv3jfWnLM6r5d1SXyzrNWCs/xTKr1icUcunWLwU+kTnbRHqR4Wyi9eOK2QyqOyUsMXx6JjltRwTUu9zw+arslYft6n1VW3XnJNTXfrOQfv7Mq2Mvhfqf5Rm1U6utngn9Pm14jXzXxTcHaHs7T6n2Dao3qXPMdk45wAAMBPfl+Z1oDaXi1ZJRKte3qcH8Sxo5U33+7TMT17EV2qcrxIpfKN5PF8rchqvytrorv1p2pSuVaL4b3X9XJpr+PUPtfiyNMflMWgTvY7VJv8u65R2TP6aNj7kVdYvbLv4CpvGHcfjlOyoXRv6/brD5is+hqdrfZXFDbUtJ6SuzxwU2t/Y5YLS9GtcCpUPrn3+CjR/B37NjWr9m9LMQ/MR7VeL49A+Nf0Z+Tzl2dL069/q6yPOaZQHS3M/jelri13ndwMAgP8LrXbFV6KYLb5rAADwr2ijvv5XCf1S9bTUBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgMXoH9hAbwyZFiGCAAAAAElFTkSuQmCC>

[image7]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAAAXCAYAAABK6RIcAAABpElEQVR4Xu2XzStEURjG31AsRCIrsrGQtX9ANlZWVoo9IsrWWslayUdkYSFlRVnY+Ngou0mJjY8iio1Iiud1zjTnvHPnzp1Tzr3p/OrX3HnOec+ceTYGUSAQCAQ64LcMPTIDR2XomVc4DJtgIxyEL9aOEnBxvsvbgp9U+Owxe9k7+XuYtlk7IjiAb+RenuucSVbKm4OLsE+sRcLN7sJnci/Bdc4kK+VVRH4glFfh99iB7fo5lKfucAlz8BR+wRprh6YZHhrvs1DeuAxj2IxxA67DNbgKl2Ht71Q8fAdz357OipBhkvJaYU+EPCcztluNJYLPmJBhynSRutesGS7pBZMk5XXCgQh5TmZsrxpLBJ8xKUPPVIv3VaTudWGG+/BIyJtYfl4pbE1EudKTwGdMyTCG+QptUGMluSJ1hzojq9fZsZFFki/PBdc5Ez5jWoYeuSH1W9ekn9S9hkReRJrltZA6Y0EueIR/dVyL7AO+i8ziHD7AWy0/n1k7yuNa3jZ8gnekPptfH0n9y5YGI6S+y71+PbGX/wbX8gJU/FcqEAgEAv+AH7WLhOGMfS5tAAAAAElFTkSuQmCC>

[image8]: <data:image/png;base64,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>