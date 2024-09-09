---
title: "Playground"

description: "We are the future."
# 1. To ensure Netlify triggers a build on our exampleSite instance, we need to change a file in the exampleSite directory.
theme_version: '2.8.2'
# cascade:
featured_image: 'https://static.igem.wiki/teams/5057/playground.svg'
sidebar: true
toc:
  - id: "h1"
    text: "Plots"
    subpoints:
      - id: "h1-1"
        text: "Line Plot"
  - id: "h2"
    text: "Orga" 
  - id: "h3"
    text: "pdf embedding"
---

All the pages are already there but simply not shown in the menu.
Have a look at our [model](model) or visit the [safety](safety) page.
You can also visit the [attributions](attributions) or [contribution](contributions) pages.

# Make your plots here {#h1}

<!-- ## Line Plot {#h1-1} -->

copy your data out of your docs sheet/excel sheet and paste it in the pink input field, then press plot data
the picture is for demonstration, you can choose how many columns you want. <br>
You can set the scope of your graph with zoom and download it directly as a png. :) <br>
Pay attention to the labeling and the units!!!.<br>
<span class="blink">Also dont use "," use "." instead</span>
If you already have used "," instead of "." dont panic and use [THIS](https://www.statology.org/google-sheets-replace-comma-with-dot/): 
<style>
.blink {
  animation: blinker 3s linear infinite;
  color: red;
  font-weight: bold;
}

@keyframes blinker {
  5% { opacity: 0; }
}
</style>

{{< plot_script >}}

<div>
<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" class="ba b athelas b--moon-gray bg-black br2 gold dib hover-bg-gold hover-black link mt4 ph4 pv3 f6">unsuspicious button</a>
</div>

### Line plots {#h1-1}

## Orga {#h2}

[Deliverables Dashboard](https://teams.igem.org/5057/deliverables)

## PDF Embedding {#h3}

<div style="width: 100%; aspect-ratio: 0.7071;">
    <object  data='https://static.igem.wiki/teams/5057/2024-05-28-moderation-und-protokoll.pdf' width="100%" height="100%" data="{{ printf "%s/%s" .RelPermalink .Params.file_path }}"></object>
  </div>


