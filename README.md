# Eclipse Phase — Ki

The Ki discipline for the [Eclipse Phase system](https://github.com/Artemystra/eclipsephase) for Foundry VTT.

Ki is the counterpart to Psi: the same Infection Rate, the same push economy, the same Chi and Gamma
mechanics, but worked through a Cyberbrain instead of a biological one. Psi stays part of the core
system; Ki lives here.

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

Worlds upgrading from before 2.5 have their Ki choices moved into these flags by the system's own
2.5 migration, whether or not this module is installed.

## Development

```
npm install
npm test
```

The compendium is edited as source JSON under `src/packs/ki-sleights/` and packed with the Foundry
CLI; never edit `packs/` by hand.
