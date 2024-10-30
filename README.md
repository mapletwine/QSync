# QSync

> [!CAUTION]
> QSync is currently in development and is not yet ready for use. Most of the below is the planned functionality and it doesn't do any of it yet. Frankly, I don't know how you found this page.

QSync is a simple tool that listens on the network for OSC data from Eos and QLab, and displays it on OBS. It is designed to be used for a lighting designer who wants a plug and play solution for archiving their work during tech, without needing to worry about configuration. This allows offline looks at the show, without needing to have the full rig or actors to see where they were at a given location.

QSync can also be used as a live playback tool, allowing the designer or operator to view the current status of everything in the show, in an easy to read format.

This project is meant to run on a dedicated computer, yet is designed to be as simple as possible to configure and use, while being free and open source.

Deployment and downloads consist of an ansible playbook, which will install all necessary software and dependencies, and a pre-built binary for the QSync application.

## Software

- OBS Studio
- Cue View
- Ansible

## Integrations

- Eos
- QLab
- NDI, for camera source
- sACN, for lighting data
- OSC, for control of the software itself.
- Timecode
