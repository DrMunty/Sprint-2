# **L'Enginyeria de Programari en l'Era de la Intel·ligència Artificial Generativa: Fonaments, Metodologies i Seguretat**

L'emergència de la intel·ligència artificial (IA) generativa ha provocat una transformació tectònica en la manera com es concep, s'implementa i es manté el programari contemporani. Aquesta evolució no representa simplement una millora incremental en les eines de desenvolupament, sinó un canvi de paradigma que desplaça el focus del programador des de l'escriptura manual de sintaxi cap a l'orquestració de sistemes intel·ligents de generació de codi. La integració de models de llenguatge de gran escala (LLM) en el flux de treball diari dels enginyers de programari ha introduït noves capacitats per a l'optimització, la refactorització i la detecció de vulnerabilitats, alhora que ha generat reptes inèdits en matèria de seguretat, validació i gestió del deute tècnic.

## **1\. Fonaments Arquitectònics i Mecanismes de Generació de Codi**

La base tecnològica que sustenta els assistents de codi moderns, com OpenAI Codex o DeepSeek Coder, resideix en l'arquitectura del Transformer, un model basat en mecanismes d'atenció que ha superat les limitacions de les xarxes neuronals recurrents en el processament de seqüències de dades.1 A diferència de les arquitectures anteriors, el Transformer permet el processament paral·lel de la informació i té la capacitat d'identificar dependències de llarg abast, una característica crucial per entendre la relació entre una definició de variable en un fitxer i el seu ús en una funció distant dins del mateix projecte.

### **L'Arquitectura Transformer i el Mecanisme d'Atenció**

El funcionament intern d'aquests models es basa en la capacitat de predir el següent "token" (una unitat de text que pot ser una paraula, una variable o un fragment de codi) a partir d'un context donat. En l'àmbit de la programació, el model no només aprèn la gramàtica d'un llenguatge, sinó també els patrons estructurals i semàntics que defineixen el bon codi. El mecanisme de "self-attention" permet al model assignar pesos variables a diferents parts de la seqüència d'entrada, centrant-se en les parts més rellevants per a la tasca actual.  
Matemàticament, el mecanisme d'atenció es defineix mitjançant les matrius de Query (![][image1]), Key (![][image2]) i Value (![][image3]):  
![][image4]  
Aquesta formalització permet que el model, quan s'enfronta a una instrucció per generar una funció en TypeScript, pugui "atendre" simultàniament a les definicions de tipus prèvies, les biblioteques importades i les convencions d'estil del projecte per produir una sortida coherent i funcional.1

### **Aprenentatge per Transferència i Fine-Tuning**

La capacitat d'un LLM per ser efectiu en tasques de programació depèn del procés d'aprenentatge per transferència ("transfer learning"). Aquest procés es divideix generalment en dues etapes: el pre-entrenament i el refinament ("fine-tuning").2

1. **Pre-entrenament:** El model s'entrena amb corpus massius de dades que inclouen tant text en llenguatge natural com milers de milions de línies de codi font de repositoris públics com GitHub.5 Durant aquesta fase, el model adquireix un coneixement generalista sobre la sintaxi de múltiples llenguatges i les formes comunes de resoldre problemes algorísmics.  
2. **Fine-Tuning:** Un cop el model té una base sòlida, es pot refinar mitjançant conjunts de dades més específics. Això permet que el model s'especialitzi en tasques concretes, com la generació de proves unitàries, la traducció entre llenguatges de programació o l'adherència a estàndards de codificació estrictes.4 Per exemple, el model DeepSeek Coder ha estat refinat per generar codi que no només sigui funcionalment correcte, sinó que també respecti estructures d'ordre i llegibilitat predefinides.4

A més d'aquestes fases, s'utilitza l'"In-context learning", on el model no modifica els seus pesos interns, sinó que utilitza les instruccions i els exemples proporcionats en el "prompt" per adaptar-se a una tasca nova de manera immediata.2

## **2\. Ecosistema de Sistemes de Desenvolupament Assistit**

L'oferta actual d'eines d'IA integrades en els entorns de desenvolupament (IDE) presenta diferents enfocaments arquitectònics i de servei, cadascun amb els seus avantatges i limitacions específiques. Les eines líders com GitHub Copilot, Windsurf i Tabnine han definit els estàndards del que s'espera d'un assistent intel·ligent.

### **GitHub Copilot: L'Estandard de la Indústria**

GitHub Copilot és actualment l'eina més madura i estesa, gràcies a la seva integració nativa amb l'ecosistema de GitHub i Microsoft.5 Utilitza models d'OpenAI per oferir completacions de codi en temps real, tant de línies individuals com de blocs complets. Les seves funcionalitats s'estenen més enllà de l'editor, integrant-se en la línia d'ordres (CLI) i en el flux de revisió de Pull Requests (PR).5 Una de les seves característiques més recents és l'"Agent Mode", que permet al model realitzar tasques multi-pas de manera més autònoma, tot i que encara es considera menys cohesionat que altres solucions enfocades exclusivament en l'agentivitat.8

### **Windsurf: L'IDE Agentic**

Windsurf, desenvolupat per Codeium, representa una nova generació d'eines que es presenten no com un connector, sinó com un IDE completament dissenyat per a la col·laboració amb IA.8 El seu component estrella és "Cascade", un flux de treball que manté una consciència contextual profunda de tot el repositori. A diferència de Copilot, que sovint es limita als fitxers oberts, Windsurf indexa tot el codi base per oferir suggerències que entenen les relacions globals del projecte.8 A més, integra agents com "Devin" que poden executar tasques de manera independent en entorns de núvol separats.9

### **Tabnine: Privadesa i Context Corporatiu**

Tabnine es diferencia pel seu enfocament en la seguretat i la personalització empresarial. És l'única de les grans plataformes que permet desplegaments completament privats i "air-gapped", garantint que el codi propietat de l'empresa mai abandoni la xarxa corporativa.11 El seu "Enterprise Context Engine" és capaç d'aprendre les arquitectures, els marcs de treball i els estàndards únics de cada organització, el que redueix significativament les al·lucinacions relacionades amb l'ús de biblioteques internes.12  
A continuació es presenta una comparativa detallada de les capacitats d'aquestes eines:

| Característica | GitHub Copilot | Windsurf | Tabnine |
| :---- | :---- | :---- | :---- |
| **Model d'Integració** | Extensió per a múltiples IDEs | IDE basat en VS Code | Extensió per a múltiples IDEs |
| **Context del Codi** | Fitxers oberts i cerca limitada | Indexació completa del repositori | Context Engine personalitzable |
| **Privadesa de Dades** | Basat en núvol (SaaS) | Núvol i opcions híbrides | On-premise, Air-gapped i VPC |
| **Capacitats Agentives** | Mode Agent emergent | Cascade (Agent nativa) | SDLC Agents especialitzats |
| **Suport de Llenguatges** | Més de 15 llenguatges principals | Multi-llenguatge universal | Més de 25 llenguatges |
| **Enfocament Principal** | Autocompletat i flux GitHub | Flux de treball agentic i RAG | Seguretat, privadesa i context |

5

## **3\. Anàlisi de Productivitat i Impacte en el Cicle de Vida del Programari**

L'adopció d'IA en el desenvolupament de programari promet increments substancials en la productivitat, però aquests guanys han de ser mesurats amb precisió per entendre el seu impacte real en el cicle de vida del producte. Google Research va realitzar un estudi exhaustiu amb més de 10.000 desenvolupadors per quantificar aquestes millores.1

### **Mètriques de Productivitat de Google Research**

L'estudi de Google va comparar un sistema híbrid (ML \+ motors semàntics) contra un grup de control, revelant dades significatives sobre la reducció de l'esforç manual i l'acceleració del temps d'entrega 1:

* **Temps d'Iteració de Codificació:** Es va observar una reducció del **6%** en el temps transcorregut entre compilacions i proves en els desenvolupadors que utilitzaven completacions de línia única.1  
* **Esforç d'Escriptura:** Els usuaris van escriure un **10% menys de caràcters** abans d'acceptar una suggerència d'IA.1  
* **Volum de Codi Generat:** Actualment, el **3% de tot el codi nou** a Google (mesurat en caràcters) prové de suggerències d'IA acceptades.1  
* **Taxes d'Acceptació:** Les suggerències que romanen visibles més de 750 ms tenen una taxa d'acceptació del **25%** per a línies úniques i del **34%** per a completacions de múltiples línies.1

Aquestes dades suggereixen que l'IA és especialment efectiva en tasques repetitives o en la generació de codi "boilerplate", on la reducció del temps d'escriptura és més evident. No obstant això, l'impacte en la generació de lògica de negoci complexa continua sent una àrea on la supervisió humana és crítica.

### **Avantatges i Desavantatges de l'Ús de l'IA**

L'ús d'IA presenta un balanç de beneficis i riscos que els gestors d'enginyeria han d'avaluar detingudament.  
**Avantatges:**

1. **Acceleració del Desenvolupament:** L'IA redueix el temps dedicat a tasques mundanes com la creació de mètodes d'accés (getters/setters), la configuració inicial de projectes i la redacció de documentació.11  
2. **Millora de la Qualitat de les Proves:** Eines com Tabnine i Copilot poden generar automàticament proves unitàries i objectes simulats ("mocks"), augmentant la cobertura de codi sense un esforç manual equivalent.5  
3. **Descobriment d'APIs i Biblioteques:** L'IA actua com una documentació interactiva que suggereix l'ús de mètodes o anotacions específiques (p. ex., en Spring Framework) que el desenvolupador podria no conèixer.14

**Desavantatges:**

1. **Augment de l'Error i la Incoherència:** Segons l'informe de CodeRabbit, els Pull Requests generats per IA contenen aproximadament **1.7x més problemes** que els humans, amb un spike notable en problemes de llegibilitat (3x més freqüents).16  
2. **Pèrdua de Context de Negoci:** Els models infereixen patrons estadísticament, no semànticament, el que pot portar a solucions que semblen correctes però que ignoren regles de negoci locals o restriccions de domini.16  
3. **Fragmentació Estètica i de Disseny:** L'IA sovint produeix codi que viola els patrons locals de nomenclatura i estructura, derivant cap a patrons genèrics trobats en el seu conjunt d'entrenament en lloc d'adherir-se a les convencions del repositori.16

## **4\. Metodologies Avançades de Prompt Engineering**

Per maximitzar la precisió del codi generat i minimitzar el risc d'errors, els desenvolupadors han d'adoptar tècniques de "prompt engineering" estructurades. No es tracta només de demanar "que es faci alguna cosa", sinó de proporcionar el context i les restriccions necessàries per guiar el model cap a una solució òptima.

### **Estructura d'un Prompt Eficaç**

Un prompt de programació professional hauria de seguir una estructura que inclogui els següents elements 18:

* **L'Objectiu de la Tasca:** Una definició clara de la funcionalitat (p. ex., "Refactoritza aquesta funció per utilitzar async/await en lloc de callbacks").  
* **El Perímetre de Canvi (Constraints):** Delimitar clarament què es pot modificar i què no. Per exemple: "No canviïs la signatura de la interfície pública" o "No afegeixis noves taules a la base de dades".17  
* **El Paquet de Context:** Incloure informació sobre les dependències, el sistema de tipus (com el de TypeScript) i les regles de l'estil de codi (naming conventions).3  
* **Exemples de Sortida (Few-Shot):** Proporcionar exemples d'entrada i la sortida desitjada ajuda al model a entendre el format i el nivell de detall requerit.20

### **Tècniques Específiques per al Desenvolupament Diari**

El "Few-Shot Prompting" ha demostrat ser una de les tècniques més potents per millorar el rendiment funcional, arribant a una taxa de correcció funcional del 29.4% en algunes proves comparatives.7 A més, l'ús de fitxers de configuració com CLAUDE.md o SKILL.md permet automatitzar les instruccions de disseny i les anti-patrons que el model ha d'evitar en cada sessió.17

| Tècnica | Descripció | Impacte Esperat |
| :---- | :---- | :---- |
| **Zero-Shot** | Instrucció directa sense exemples. | Ràpid però propens a al·lucinacions. |
| **Few-Shot** | Proporcionar 1-3 exemples de codi similar. | Augmenta la coherència estilística i funcional. |
| **Chain-of-Thought** | Demanar al model que expliqui els passos abans de generar el codi. | Millora la lògica en algorismes complexos. |
| **Program-Aided (PAL)** | El model genera un programa per ajudar-lo a raonar. | Útil per a tasques lògiques i matemàtiques. |
| **RAG (Retrieval-Augmented)** | Connectar el prompt amb documentació interna o wikis. | Redueix errors sobre APIs internes i propietaris. |

7

## **5\. Estratègies per a la Validació i Detecció d'Al·lucinacions**

Les al·lucinacions en el codi generat per IA es defineixen com la producció de resultats que semblen plausibles però que són factualment incorrectes o que no es basen en el context proporcionat.23 En programació, això pot manifestar-se com la invocació de biblioteques inexistents, l'ús de mètodes deprecats o la creació de bucles infinits que semblen estructures de control vàlides.

### **Tècniques de Detecció de Risc**

La detecció d'al·lucinacions requereix una combinació de mètodes automatitzats i supervisió humana:

1. **Canary Trap (Trampa de Canari):** Aquesta tècnica consisteix a introduir dades intencionadament falses o fictícies en el context del prompt per observar si el model les utilitza ("canta") o si les ignora a favor del seu coneixement general (WK). Si el model ignora les dades fictícies obligatòries, indica una al·lucinació o un biaix perillós cap a la informació d'entrenament en lloc del context actual.26  
2. **Verificació Creuada de Models:** Utilitzar un model diferent per validar la sortida del primer. Es pot instruir a un segon LLM per actuar com a avaluador, demanant-li que identifiqui quines parts de la resposta no es basen en el context proporcionat i assignant una puntuació d'al·lucinació entre 0 i 1\.25  
3. **Proves de Caracterització:** Abans de permetre que l'IA refactoritzi codi existent, s'han d'escriure "tests de caracterització" que bloquegin el comportament actual del sistema. Qualsevol desviació en els resultats després de la intervenció de l'IA indica una al·lucinació lògica o una regressió.18

### **El Flux de Treball de Validació HITL**

L'enfocament "Human-in-the-Loop" (HITL) és essencial per garantir que el codi generat sigui apte per a producció. Això implica que el desenvolupador no ha d'acceptar suggerències de manera cega, sinó que ha de realitzar un escepticisme actiu 25:

* **Qüestionar les Assumpcions:** El revisor s'ha de preguntar: "Quines assumpcions està fent aquest codi que no estan explicitades?".29  
* **Validació de Dades de Test:** Verificar que els tests generats per l'IA no siguin "teatre de tests" (tests que passen però no comproven res significatiu).30 Un mètode eficaç és canviar l'asseveració (assertion) al seu oposat i comprovar si el test realment falla.30  
* **Verificació de Límits:** Assegurar que el codi gestioni correctament les condicions de contorn, els valors nuls i les excepcions, àrees on l'IA tendeix a ser massa optimista.16

## **6\. Identificació d'Olors de Codi i Refactorització Assistida**

Un dels usos més potents de l'IA és la capacitat d'analitzar grans volums de codi per identificar "olors de codi" (code smells), que són indicadors estructurals de problemes més profunds que podrien dificultar el manteniment futur.31

### **Olors de Codi Comuns Detectats per IA**

L'IA pot actuar com un revisor infatigable que detecta patrons com 31:

* **Bloaters (Inflaments):** Mètodes massa llargs o classes excessivament grans ("God Objects") que violen el Principi de Responsabilitat Única (SRP).  
* **Obsessió Primitiva:** L'ús de tipus bàsics (com string per a una adreça) en lloc d'objectes de domini rics.  
* **Feature Envy (Enveja de Funcionalitat):** Un mètode que utilitza més dades d'una altra classe que de la seva pròpia.  
* **Duplicació de Codi:** Fragments que violen el principi DRY (Don't Repeat Yourself).

A més de detectar aquestes olors tradicionals, s'ha de tenir cura amb les "olors induïdes per IA", com la verbositat excessiva (boilerplate innecessari) i les "abstraccions trencades", on l'IA crea una interfície però la viola referenciant tipus concrets dins de la seva pròpia implementació.17

### **Protocol de Refactorització Segura**

Per utilitzar l'IA en processos de refactorització de codi llegat, es recomana seguir un protocol de set passos per minimitzar el risc de regressions 18:

1. **Bloquejar el Comportament:** No refactoritzar mai sense tests de caracterització o instantànies ("snapshots") que assegurin que la lògica de negoci es manté intacta.  
2. **Petits Pull Requests:** En lloc d'una gran reescriptura, realitzar canvis atòmics. "Un PR \= una intenció". Si la revisió tarda més d'un minut a ser entesa, el PR és massa gran.  
3. **Definir Restriccions Clares:** En el prompt, especificar que no s'han de canviar les interfícies públiques ni la lògica d'autenticació o pagaments sense supervisió explícita.  
4. **Empaquetar el Context:** Proporcionar al model no només el fitxer a canviar, sinó també els fragments de codi dels quals depèn.  
5. **Revisió de Domini Obligatòria:** La revisió humana ha de centrar-se en els invariants (outputs, comportament de contorn).  
6. **Execució de Portes de Seguretat:** Els escanejos de vulnerabilitats (SAST) s'han d'executar de manera independent a la revisió de l'IA.  
7. **Pla de Rollback:** Tot canvi refactoritzat ha de tenir una estratègia de reversió pràctica (feature flags o desplagaments blue-green).

## **7\. Seguretat, Privadesa i Governança del Codi Generat**

La introducció de codi generat per IA en sistemes crítics comporta riscos de seguretat que s'han de gestionar mitjançant polítiques de governança clares i l'ús d'estàndards de la indústria com l'OWASP Top 10 per a Aplicacions de LLM.35

### **Riscos de Seguretat segons OWASP**

L'OWASP ha identificat els riscos més crítics en l'ús d'IA generativa (Versió 2025), molts dels quals afecten directament al desenvolupament de programari 35:

* **LLM01: Injecció de Prompts:** Atacs on l'usuari manipula el prompt per forçar l'IA a generar codi maliciós o a saltar-se les restriccions de seguretat del sistema.  
* **LLM02: Revelació d'Informació Sensible:** El risc que el model inclogui secrets, claus d'API o dades privades en el codi generat basant-se en el que va veure durant l'entrenament o en prompts anteriors.  
* **LLM05: Gestió Insegura de Sortides:** Passar la sortida de l'IA directament a altres sistemes (com un intèrpret de comandes o una base de dades) sense validació, el que pot portar a execució remota de codi (RCE).  
* **LLM06: Agència Excessiva:** Donar als agents d'IA permisos excessius per realitzar accions de manera autònoma (com modificar el sistema de fitxers o esborrar usuaris) sense una verificació humana.

### **Implicacions de Privadesa i Propietat Intel·lectual**

L'ús de models públics planteja dubtes sobre la propietat intel·lectual i el risc que el codi propietari acabi formant part de futurs conjunts d'entrenament.6 Per a organitzacions en sectors regulats, eines com Tabnine ofereixen la millor resposta mitjançant desplegaments en VPC o entorns totalment aïllats ("air-gapped"), on el codi mai surt del perímetre de seguretat de l'empresa.12

| Tipus de Risc | Descripció | Mitigació Suggerida |
| :---- | :---- | :---- |
| **Vulnerabilitats de Seguretat** | SQL injection, Buffer overflows en el codi generat. | SAST automatitzat i revisió humana estricta. |
| **Enverinament de Dades** | Dades d'entrenament manipulades per induir comportaments insegurs. | Ús de models de proveïdors de confiança amb dades curades. |
| **Fuga de Secrets** | Inclusió de credencials hardcoded en suggerències d'IA. | Escaneig de secrets en el pipeline de CI/CD. |
| **Deute Tècnic** | Codi ineficient o mal estructurat que s'acumula ràpidament. | Regles de linter estrictes i mètriques de complexitat. |

11

## **8\. L'Horitzó del Desenvolupament Agentic i Autònom**

El futur de la col·laboració humà-IA s'allunya de l'autocompletat simple i es dirigeix cap a sistemes agentics capaços de gestionar el cicle de vida del desenvolupament de manera gairebé autònoma.

### **De l'Assistent a l'Agent**

Eines com Windsurf i el seu component Cascade estan liderant aquest canvi, permetent que l'IA planifiqui tasques multi-pas abans d'executar-les.8 Un desenvolupador pot donar una especificació en llenguatge natural ("Crea una nova funcionalitat de perfil d'usuari amb autenticació OAuth2") i l'agent pot crear els fitxers de backend, frontend, les migracions de base de dades i les proves unitàries de manera coordinada.9  
Aquesta evolució transforma el rol del programador:

* **De l'Escriptura a la Revisió:** El programador es converteix en un supervisor que valida les decisions de l'agent i corregeix els petits errors de coherència.29  
* **Llenguatge Natural com a Eina Primària:** La capacitat de parlar o escriure promptes clars i precisos serà tan important com conèixer la sintaxi de Java o Python.37  
* **Gestió de la Complexitat:** Els desenvolupadors hauran de ser experts en arquitectura de sistemes per assegurar que els agents no creïn una complexitat ingestionable en projectes de milions de línies de codi.10

### **Conclusions i Recomanacions**

La integració efectiva de l'IA en l'enginyeria de programari no és una qüestió de triar entre humans o màquines, sinó de crear una simbiosi on cada part aporti les seves fortaleses. L'IA aporta velocitat, capacitat de processament de dades massives i detecció de patrons, mentre que l'humà aporta el context de negoci, el sentit crític de seguretat i la visió arquitectònica a llarg termini.  
Per als professionals que busquen optimitzar el seu flux de treball, la recomanació és clara: integrar eines d'IA de manera gradual, començant per tasques de baixa criticitat com la generació de documentació i proves unitàries, i anar escalant cap a la refactorització i el disseny assistit a mesura que es consoliden els mecanismes de validació i les portes de seguretat automatitzades. La programació ja no és un acte solitari d'escriptura, sinó un diàleg continu i assistit cap a la creació de programari més robust, segur i eficient.

#### **Obras citadas**

1. ML-Enhanced Code Completion Improves Developer Productivity, fecha de acceso: mayo 3, 2026, [https://research.google/blog/ml-enhanced-code-completion-improves-developer-productivity/](https://research.google/blog/ml-enhanced-code-completion-improves-developer-productivity/)  
2. From BERT to GPT-3 Codex: Harnessing the Potential of Very Large Language Models for Data Management \- VLDB Endowment, fecha de acceso: mayo 3, 2026, [https://www.vldb.org/pvldb/vol15/p3770-trummer.pdf](https://www.vldb.org/pvldb/vol15/p3770-trummer.pdf)  
3. README | TypeScript Deep Dive \- GitBook, fecha de acceso: mayo 3, 2026, [https://basarat.gitbook.io/typescript](https://basarat.gitbook.io/typescript)  
4. Generative Models for Source Code: Fine-Tuning Techniques for Structured Pattern Learning \- MDPI, fecha de acceso: mayo 3, 2026, [https://www.mdpi.com/2227-7080/12/11/219](https://www.mdpi.com/2227-7080/12/11/219)  
5. GitHub Copilot documentation \- GitHub Docs, fecha de acceso: mayo 3, 2026, [https://docs.github.com/en/copilot](https://docs.github.com/en/copilot)  
6. A systematic literature review on the impact of AI models on the security of code generation, fecha de acceso: mayo 3, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC11128619/](https://pmc.ncbi.nlm.nih.gov/articles/PMC11128619/)  
7. Robust Code Generation using Large Language Models \- Diva-portal.org, fecha de acceso: mayo 3, 2026, [https://www.diva-portal.org/smash/get/diva2:1875797/FULLTEXT01.pdf](https://www.diva-portal.org/smash/get/diva2:1875797/FULLTEXT01.pdf)  
8. Windsurf vs GitHub Copilot: AI Code Editors Head to Head | MindStudio, fecha de acceso: mayo 3, 2026, [https://www.mindstudio.ai/blog/windsurf-vs-github-copilot](https://www.mindstudio.ai/blog/windsurf-vs-github-copilot)  
9. Windsurf Editor | Windsurf, fecha de acceso: mayo 3, 2026, [https://codeium.com/windsurf](https://codeium.com/windsurf)  
10. Windsurf vs GitHub Copilot | AI IDE Comparison, fecha de acceso: mayo 3, 2026, [https://windsurf.com/compare/windsurf-vs-github-copilot](https://windsurf.com/compare/windsurf-vs-github-copilot)  
11. Tabnine Development Tools Powering AI Coding Teams \- Wildnet Edge, fecha de acceso: mayo 3, 2026, [https://www.wildnetedge.com/blogs/tabnine-development-tools](https://www.wildnetedge.com/blogs/tabnine-development-tools)  
12. Code that's Secure, Reliable, and Mission-Ready \- Tabnine, fecha de acceso: mayo 3, 2026, [https://www.tabnine.com/blog/ai-built-for-mission-critical-software-development/](https://www.tabnine.com/blog/ai-built-for-mission-critical-software-development/)  
13. Tabnine AI Code Assistant | Smarter AI Coding Agents. Total Enterprise Control., fecha de acceso: mayo 3, 2026, [https://www.tabnine.com/](https://www.tabnine.com/)  
14. What is Tabnine AI? | Coderspace Blog, fecha de acceso: mayo 3, 2026, [https://coderspace.io/en/blog/software-development-focused-artificial-intelligence-platform-tabnine/](https://coderspace.io/en/blog/software-development-focused-artificial-intelligence-platform-tabnine/)  
15. Overview | Tabnine Docs, fecha de acceso: mayo 3, 2026, [https://docs.tabnine.com/main](https://docs.tabnine.com/main)  
16. AI vs human code gen report: AI code creates 1.7x more issues \- CodeRabbit, fecha de acceso: mayo 3, 2026, [https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report](https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report)  
17. Code Smells in Generated Code \- some of the patterns : r/ClaudeAI \- Reddit, fecha de acceso: mayo 3, 2026, [https://www.reddit.com/r/ClaudeAI/comments/1ozhq5e/code\_smells\_in\_generated\_code\_some\_of\_the\_patterns/](https://www.reddit.com/r/ClaudeAI/comments/1ozhq5e/code_smells_in_generated_code_some_of_the_patterns/)  
18. Best Practices for AI Refactoring Legacy Code: 7 Safe Rules \- CodeGeeks Solutions, fecha de acceso: mayo 3, 2026, [https://www.codegeeks.solutions/blog/best-practices-for-ai-refactoring-legacy-code](https://www.codegeeks.solutions/blog/best-practices-for-ai-refactoring-legacy-code)  
19. AI Code Refactoring: Tools, Tactics & Best Practices, fecha de acceso: mayo 3, 2026, [https://www.augmentcode.com/tools/ai-code-refactoring-tools-tactics-and-best-practices](https://www.augmentcode.com/tools/ai-code-refactoring-tools-tactics-and-best-practices)  
20. Using AI to Refactor Legacy Codebases Intelligently | by Chandrima Mukherjee \- Medium, fecha de acceso: mayo 3, 2026, [https://medium.com/@97chandrima.mukherjee/using-ai-to-refactor-legacy-codebases-intelligently-955c2158f495](https://medium.com/@97chandrima.mukherjee/using-ai-to-refactor-legacy-codebases-intelligently-955c2158f495)  
21. GitHub \- dair-ai/Prompt-Engineering-Guide: Guides, papers, lessons ..., fecha de acceso: mayo 3, 2026, [https://github.com/dair-ai/Prompt-Engineering-Guide](https://github.com/dair-ai/Prompt-Engineering-Guide)  
22. Transfer skills.md from claude code to codex \- newline, fecha de acceso: mayo 3, 2026, [https://www.newline.co/@Dipen/transfer-skillsmd-from-claude-code-to-codex--e7f7b01e](https://www.newline.co/@Dipen/transfer-skillsmd-from-claude-code-to-codex--e7f7b01e)  
23. AI Hallucinations: What Designers Need to Know \- NN/G, fecha de acceso: mayo 3, 2026, [https://www.nngroup.com/articles/ai-hallucinations/](https://www.nngroup.com/articles/ai-hallucinations/)  
24. What are AI hallucinations? \- Google Cloud, fecha de acceso: mayo 3, 2026, [https://cloud.google.com/discover/what-are-ai-hallucinations](https://cloud.google.com/discover/what-are-ai-hallucinations)  
25. Detecting Hallucinations in Generative AI \- Codecademy, fecha de acceso: mayo 3, 2026, [https://www.codecademy.com/article/detecting-hallucinations-in-generative-ai](https://www.codecademy.com/article/detecting-hallucinations-in-generative-ai)  
26. Detecting AI Hallucination Risk Using a CIA Technique \- TELUS Digital, fecha de acceso: mayo 3, 2026, [https://www.telusdigital.com/insights/data-and-ai/article/ai-hallucination-detection](https://www.telusdigital.com/insights/data-and-ai/article/ai-hallucination-detection)  
27. Detect hallucinations for RAG-based systems | Artificial Intelligence \- AWS, fecha de acceso: mayo 3, 2026, [https://aws.amazon.com/blogs/machine-learning/detect-hallucinations-for-rag-based-systems/](https://aws.amazon.com/blogs/machine-learning/detect-hallucinations-for-rag-based-systems/)  
28. Best practices for AI refactoring legacy code \- Altamira, fecha de acceso: mayo 3, 2026, [https://www.altamira.ai/blog/best-practices-for-ai-refactoring-legacy-code/](https://www.altamira.ai/blog/best-practices-for-ai-refactoring-legacy-code/)  
29. 5 Best Practices for Reviewing and Approving AI-Generated Code \- Bright Security, fecha de acceso: mayo 3, 2026, [https://brightsec.com/blog/5-best-practices-for-reviewing-and-approving-ai-generated-code/](https://brightsec.com/blog/5-best-practices-for-reviewing-and-approving-ai-generated-code/)  
30. How to Validate AI-Generated Tests? \- testRigor AI-Based Automated Testing Tool, fecha de acceso: mayo 3, 2026, [https://testrigor.com/blog/how-to-validate-ai-generated-tests/](https://testrigor.com/blog/how-to-validate-ai-generated-tests/)  
31. Best Practices for Identifying and Eliminating Code Smells \- Codacy | Blog, fecha de acceso: mayo 3, 2026, [https://blog.codacy.com/best-practices-for-identifying-and-eliminating-code-smells](https://blog.codacy.com/best-practices-for-identifying-and-eliminating-code-smells)  
32. Understanding Code Smells: Types, Refactoring & Best Practices \- Aubergine Solutions, fecha de acceso: mayo 3, 2026, [https://www.aubergine.co/insights/understanding-code-smells-types-refactoring-best-practices](https://www.aubergine.co/insights/understanding-code-smells-types-refactoring-best-practices)  
33. Refactoring, Code Smells, Coupling and Cohesion \- Moodle@Units, fecha de acceso: mayo 3, 2026, [https://moodle2.units.it/pluginfile.php/588349/mod\_resource/content/1/Refactoring%2C%20Code%20Smells%2C%20Coupling%20and%20Cohesion.pdf](https://moodle2.units.it/pluginfile.php/588349/mod_resource/content/1/Refactoring%2C%20Code%20Smells%2C%20Coupling%20and%20Cohesion.pdf)  
34. Code Smells: What They Are and Common Types to Identify \- Legit Security, fecha de acceso: mayo 3, 2026, [https://www.legitsecurity.com/aspm-knowledge-base/code-smells](https://www.legitsecurity.com/aspm-knowledge-base/code-smells)  
35. OWASP Top 10 for Large Language Model Applications | OWASP ..., fecha de acceso: mayo 3, 2026, [https://owasp.org/www-project-top-10-for-large-language-model-applications/](https://owasp.org/www-project-top-10-for-large-language-model-applications/)  
36. AI-Driven Code Optimization: Smarter & Faster Development \- Ubiminds, fecha de acceso: mayo 3, 2026, [https://ubiminds.com/en-us/ai-driven-code-optimization/](https://ubiminds.com/en-us/ai-driven-code-optimization/)  
37. 4 Techniques to Optimize AI Coding Efficiency \- Towards Data Science, fecha de acceso: mayo 3, 2026, [https://towardsdatascience.com/4-techniques-to-optimize-ai-coding-efficiency/](https://towardsdatascience.com/4-techniques-to-optimize-ai-coding-efficiency/)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAZCAYAAADuWXTMAAAA9ElEQVR4Xu2QsQ4BQRCGRzRItCqdRqWh0EqUdCoP4DVQ8AYSlegVHoBEp6Cio9GLCImECjuZWcbcZW0r8SWT3fv+uZ27Bfgj6Zt6mDryejNV/OgIoQLU3FA+x76p/IshUENcecsYKA9QBQrqOhCUgXq6OkAZeqoCe1ZSzFjidBdpoL61lL5TO0B9LSsiLHxePgP1ZaxIsbha4SAwJMpiKWUIWaC+gQ5Q3rVUBKZa7L8gMd5PTPXYTUUeCoYjU3vhTqY2QIfjxTo5AB2yAPoN3NdEnhD7r2xNlcQzfoE3O6DpF17zn7GbNrxvea4yLwqmklr+ME9Ap0Q/l+OxzAAAAABJRU5ErkJggg==>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAYCAYAAAD3Va0xAAAA0klEQVR4XmNgGAWkgtlA/AmI/yPhVygqGBi+IMmBsDeqNCqAKcIGmoD4PLogNsDIADHkFroEEFwGYl90QVwgmwFiUDiSGBMQ/wNiLiQxguAlA6q3DIH4KRKfaIAcPtOg7GMIaeIBSOMFBojLtKB8XAGPE8DC5w+S2BKoWD6SGEHwmgG77SS7CpeGtwwQcUV0CWyAmQGi+DS6BBCoMkDk3qNLYAP9DBDFoegSUABzrSC6BAwsY4Dkr3dQ/JUBkvhgQIYB4hJQWnrMAFF7D0l+FIwCALDWPUOqr0VdAAAAAElFTkSuQmCC>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAYAAAAC9s/ZAAAAo0lEQVR4XmNgGAUgwAjEH4D4PxJ+i6ICAv4yIORBbAwwnwEi6YAmjgxA8jhBAgNEQTWaOAxsBGJjdEFkoMwAMWAbugQQcAHxM3RBbABkwEd0QSD4hS6AC8ACCRkkA3ENmhhOgM0AdD5egG7ANSAWReITBLcYIAYwA/FOINZBlSYM5jFADPAD4ntockSBBAZMb5AEFBkgmtPRJUgBp9EFRsFgBwCn7iceXggXuAAAAABJRU5ErkJggg==>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAA1CAYAAAD8i7czAAAAlklEQVR4Xu3BAQ0AAADCoPdPbQ43oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC4MQHDAAEGZZYaAAAAAElFTkSuQmCC>