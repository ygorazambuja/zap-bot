#!/bin/bash
.PHONY: default
.SILENT:

default:


start:
    docker-compose -f docker-compose-dev.yml up
