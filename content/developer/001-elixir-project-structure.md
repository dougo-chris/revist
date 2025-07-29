---
title: "How I structure Elixir projects"
tag: "elixir"
date: "2022-09-02"
description: "This is the pattern I use for structuring Elixir projects."
---

When I start an elixir project I structure the content in the **lib** directory a little differently.

| Directory |         |
| ---       | ---     |
| dal       |         |
| db        |         |
| exec      |         |
| i13n      |         |
| mailer    |         |
| service   |         |
| util      |         |
| web       |         |


And inside the **lib/web** directory I'll have the following directories

| Directory   |         |
| ---         | ---     |
| components  |         |
| controllers |         |
| helpers     |         |
| hooks       |         |
| live        |         |
| plugs       |         |
| routers     |         |
| socket      |         |
| view        |         |
