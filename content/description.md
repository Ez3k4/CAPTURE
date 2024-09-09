---
title: Description
featured_image: 'https://static.igem.wiki/teams/5057/plates.jpg'
omit_header_text: true
sidebar: true 
description: 
toc:
  - id: "h1"
    text: "Abstract"
    level: "2"
  - id: "h2"
    text: "Challenge" 
    level: "2"
  - id: "h3"
    text: "Our project"
    level: "2"
  - id: "h4"
    text: "References"  
    level: "2" 
---


## CAPTURE - Combating *Pseudomonas aeruginosa* infections with antimicrobial peptide carriers {#h1}
The bacterium *Pseudomonas aeruginosa* is a leading cause of hospital-acquired infections, including ventilator-associated pneumonia and sepsis [[1]](#Ref1). This pathogen exacerbates the condition of already compromised patients and exhibits high resistance to antibiotics, posing a significant challenge in healthcare settings [[2]](#Ref2). Our project aims to combat *P. aeruginosa* through a novel approach involving carriers for {{< definition text="A class of small cationic peptides produced by the innate immune system" >}}Antimicrobial Peptides{{< /definition >}}.

The aim is to ensure the effective delivery of AMPs directly into the bacterial cells, thereby maximizing their antimicrobial activity. By encapsulating a plasmid encoding a potent AMP within specialized carriers, we strive to create a targeted therapeutic system capable of eradicating *P. aeruginosa* infections. The carriers will be administered via an aerosol delivery system, enabling targeting of bacterial infections in the lungs. To validate our approach we will initially test the system using the strain *Pseudomonas fluorescens* as a model organism. This cutting-edge research holds promise for developing effective treatments against *P. aeruginosa* infections, potentially improving patient outcomes.


## *Pseudomonas aeruginosa* Infections: A Significant Challenge {#h2}
*Pseudomonas aeruginosa* presents a significant challenge in modern healthcare due to its intrinsic resistance to antibiotics and its remarkable ability to acquire new resistance mechanisms. This opportunistic pathogen is a leading cause of severe healthcare-associated infections, particularly in immunocompromised individuals and those in intensive care units. Its ability to form biofilms on medical devices and tissues further complicates treatment, leading to persistent infections that are difficult to eradicate. The high morbidity and mortality rates, combined with the substantial economic burden on healthcare systems, underscore the urgency of addressing this issue.

*P. aeruginosa* is associated with 559,000 annual deaths globally [[3]](#Ref3). *P. aeruginosa* produces beta-lactamases, rendering most penicillins and cephalosporins ineffective [[4]](#Ref4). Current therapies rely on inhaling colistin or tobramycin, chosen based on the patient's condition, and sometimes combined with ceftazidime for increased potency. Yet, even these measures can only provide temporary respite, curing early infections after weeks of treatment but failing to eradicate chronic cases.

Developing new antimicrobial agents, innovative therapies, and advanced treatment modalities is not just a necessity – it's an imperative. By leveraging cutting-edge research and technology, we developed CAPTURE as a formidable strategy to combat *P. aeruginosa* infections. Our goal is to harness a targeted approach, eliminating the bacteria while minimizing side effects, sparing patients' already compromised lungs from the onslaught of a highly effective yet indiscriminate antibiotic cocktail.

With CAPTURE, our goal is to find a better solution against the threat of *P. aeruginosa* infections and provide new hope for patients suffering from these difficult-to-treat infections.

## How can we overcome the antibiotics resistance in *Pseudomonas*? {#h3}

To combat antibiotic resistance in *Pseudomonas aeruginosa*, our approach employs a multi-pronged strategy. First, we harness the power of antimicrobial peptides (AMPs), which are evolutionarily conserved components of immune systems [[5]](#Ref5). Unlike conventional antibiotics that inhibit metabolic processes, AMPs disrupt bacterial cell membranes through their cationic properties, making it difficult for bacteria to develop resistance [[6](#Ref6)[,7](#Ref7)]. Instead of delivering pre-synthesized AMPs, we opt for a plasmid encoding a potent AMP, placing its expression under the control of a constitutively active, *Pseudomonas*-specific promoter. This strategy ensures high levels of peptide synthesis within the target bacteria, circumventing the need for expensive external synthesis and purification processes.

To efficiently deliver this plasmid, we employ two distinct delivery systems: liposomes and outer membrane vesicles (OMVs). Liposomes, vesicular structures formed by phospholipids, have been extensively researched and adapted for drug and gene delivery applications, including the COVID-19 mRNA vaccines [[8]](#Ref8). Their properties, such as lipid composition, size, and surface modifications, can be tailored to enhance encapsulation, stability, and target specificity [[9]](#Ref9).

OMVs, on the other hand, are naturally secreted by gram-negative bacteria and play crucial roles in horizontal gene transfer and stress responses [[10]](#Ref10). By engineering an *Escherichia coli* strain devoid of common outer membrane proteins, we produce "clean" OMVs that primarily display our membrane protein of interest [[11]](#Ref11). This setup ensures minimal immune response and maximal surface expression of targeting ligands. Through the SpyCatcher/SpyTag system [[12]](#Ref12), we can fuse phage tail proteins specific to *P. aeruginosa* [[13]](#Ref13), enabling selective targeting and binding to the pathogen. Our modular approach allows for the incorporation of multiple phage tail proteins, offering versatility and the potential for broad-spectrum antibacterial therapies.


## References {#h4}
---
<div class="f5">
<p id="Ref1"> [1] Qin S, Xiao W, Zhou C, Pu Q, Deng X, Lan L, u. a. Pseudomonas aeruginosa: pathogenesis, virulence factors, antibiotic resistance, interaction with host, technology advances and emerging therapeutics. Sig Transduct Target Ther. 25. Juni 2022;7(1):199.</p> 

<p id="Ref2"> [2] Muteeb G, Rehman MT, Shahwan M, Aatif M. Origin of Antibiotics and Antibiotic Resistance, and Their Impacts on Drug Development: A Narrative Review. Pharmaceuticals. 15. November 2023;16(11):1615.</p> 

<p id="Ref3"> [3] Ikuta KS, Swetschinski LR, Robles Aguilar G, Sharara F, Mestrovic T, Gray AP, u. a. Global mortality associated with 33 bacterial pathogens in 2019: a systematic analysis for the Global Burden of Disease Study 2019. The Lancet. Dezember 2022;400(10369):2221–48. 
</p>

<p id="Ref4"> [4] Ciofu O. Chromosomal beta-lactamase is packaged into membrane vesicles and secreted from Pseudomonas aeruginosa. Journal of Antimicrobial Chemotherapy. 1. Januar 2000;45(1):9–13.</p>

<p id="Ref5"> [5] Huan Y, Kong Q, Mou H, Yi H. Antimicrobial Peptides: Classification, Design, Application and Research Progress in Multiple Fields. Front Microbiol. 16. Oktober 2020;11:582779.</p>

<p id="Ref6"> [6] Shai Y. Mechanism of the binding, insertion and destabilization of phospholipid bilayer membranes by α-helical antimicrobial and cell non-selective membrane-lytic peptides. Biochimica et Biophysica Acta (BBA) - Biomembranes. Dezember 1999;1462(1–2):55–70.</p>

<p id="Ref7"> [7] Hancock REW, Lehrer R. Cationic peptides: a new source of antibiotics. Trends in Biotechnology. Februar 1998;16(2):82–8.</p>

<p id="Ref8"> [8] Tenchov R, Bird R, Curtze AE, Zhou Q. Lipid Nanoparticles─From Liposomes to mRNA Vaccine Delivery, a Landscape of Research Diversity and Advancement. ACS Nano. 23. November 2021;15(11):16982–7015.</p>

<p id="Ref9"> [9] Khan AA, Allemailem KS, Almatroodi SA, Almatroudi A, Rahmani AH. Recent strategies towards the surface modification of liposomes: an innovative approach for different clinical applications. 3 Biotech. April 2020;10(4):163.</p>

<p id="Ref10"> [10] Aktar S, Okamoto Y, Ueno S, Tahara YO, Imaizumi M, Shintani M, u. a. Incorporation of Plasmid DNA Into Bacterial Membrane Vesicles by Peptidoglycan Defects in Escherichia coli. Front Microbiol. 29. November 2021;12:747606.</p>

<p id="Ref11"> [11] Weyant KB, Oloyede A, Pal S, Liao J, Jesus MRD, Jaroentomeechai T, u. a. A modular vaccine platform enabled by decoration of bacterial outer membrane vesicles with biotinylated antigens. Nat Commun. 28. Januar 2023;14(1):464.</p>

<p id="Ref12"> [12] Van Den Berg Van Saparoea HB, Houben D, De Jonge MI, Jong WSP, Luirink J. Display of Recombinant Proteins on Bacterial Outer Membrane Vesicles by Using Protein Ligation. Drake HL, Herausgeber. Appl Environ Microbiol. 15. April 2018;84(8):e02567-17.</p>

<p id="Ref13"> [13] Grahn AM, Caldentey J, Bamford JKH, Bamford DH. Stable Packaging of Phage PRD1 DNA Requires Adsorption Protein P2, Which Binds to the IncP Plasmid-Encoded Conjugative Transfer Complex. J Bacteriol. November 1999;181(21):6689–96.</p>

</div>