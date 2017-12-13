#!/bin/bash

mkdir -p /tmp/influxexports

influx_inspect export -out /tmp/influxexports/snap.dump -database snap
influx_inspect export -out /tmp/influxexports/snapaverage.dump -database snapaverage

kubectl port-forward -n hyperpilot $(kubectl get pods -n hyperpilot | grep influxsrv | awk '{print $1;}') 9086:8086 &

pf_pid=$!

sleep 5

influx -port 9086 -import -path /tmp/influxexports/snap.dump
influx -port 9086 -import -path /tmp/influxexports/snapaverage.dump

kill $pf_pid
