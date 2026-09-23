# Eclipse Phase — Ki

The Ki discipline for the [Eclipse Phase system](https://github.com/Artemystra/eclipsephase) for Foundry VTT.

*Psi reaches into the mind. Ki reaches into the machine — and makes it flesh.*

Ki is **homebrew**. It is in no Eclipse Phase rulebook and never was: it is a campaign-original,
machine-bound mutation of the exsurgent virus, written for one table and packaged here for anyone
who wants it. Installing it changes nothing about how Psi plays.

At its core is a Psi strain trapped inside a cyberbrain, cut off from the biological tissue it once
expressed itself through and forced to adapt. Circuitry becomes nerves. The occupied synthmorph
becomes flesh. Sensors, radio, power systems and smart materials become organs the infection can
reach through. A Ki async does not hack a machine and does not run Psi as software — Ki manifests
physically. Metal reshapes. Systems push past their limits. Dead channels begin to whisper.
Separate devices move as if they shared a nervous system.

So the module gives Ki the shape Psi already has: passive Ki-Chi sleights, active Ki-Gamma effects
and exsurgent sub-strains of its own. It is strongest in synthmorphs, unstable in pods and painfully
incompatible with biomorphs. What begins as power over a machine tends to raise a less comfortable
question — whether the machine has started answering back.

Mechanically it is Psi's counterpart: the same Infection Rate, the same push economy, the same Chi
and Gamma mechanics, but worked through a Cyberbrain instead of a biological one. Psi stays part of
the core system; Ki lives here.

## What the module adds

- **40 Ki sleights** plus the `Ki I` and `Ki II` prerequisite traits, in their own compendium.
- **Five Ki sub-strains** — The Crucible, Redline, Signal, Ruin and Colony — with their influence
  tables and the sheet section that lets a player record their choices.
- **The Ki substrate rule**: a Ki sleight needs a Cyberbrain, is penalised by 30 when worked from a
  Cyberbrain in a biological body, and — unlike Psi — is never blocked by jamming.
- **Feedback damage on the mental track**: Ki feedback costs Stress and Trauma, where Psi costs
  Durability and Wounds.

## Requirements

Eclipse Phase system **2.5** or later. The module registers itself through the system's strain-family
registry, which earlier versions do not have.

## Installing

Paste the manifest URL into Foundry's module installer:

```
https://raw.githubusercontent.com/Artemystra/eclipsephase-ki/main/module.json
```

## Turning the module off

A character's Ki sub-strain choices live in this module's flags, so they survive with the module
disabled — nothing is deleted. While it is off, the system does not know the Ki family at all: Ki
sleights stay visible on the sheet but their rolls are refused with a message saying so, and a
warning triangle marks them. They are never silently resolved as Psi. Re-enabling the module
restores everything.
