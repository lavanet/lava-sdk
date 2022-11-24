FROM envoyproxy/envoy-dev:8463e658db7a336c2f8971d644ce10b9e4efa6da
COPY envoy.yaml /etc/envoy/envoy.yaml
RUN chmod go+r /etc/envoy/envoy.yaml