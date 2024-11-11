import { CarouselItem } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Network, Server, Settings, Shield } from "lucide-react";

export default function EnvoySlideUpdatedFormatted() {
  return (
    <CarouselItem>
      <div className="h-screen w-full bg-background flex items-center justify-center px-8">
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="flex flex-col-reverse md:flex-row gap-10 items-center">
            {/* Left Section */}
            <div className="flex-1 flex flex-col justify-center space-y-6">
              {/* HTTP Filters Configuration */}
              <motion.div
                className="bg-background shadow-md rounded-lg p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-2xl font-bold mb-4">
                  HTTP Filters Configuration
                </h2>
                <div className="bg-muted rounded-md p-4 overflow-auto">
                  <pre className="text-sm md:text-base whitespace-pre-wrap">
                    <code>{`http_filters:
  - name: envoy.filters.http.grpc_web
    typed_config:
      "@type": type.googleapis.com/envoy.extensions.filters.http.grpc_web.v3.GrpcWeb
  - name: envoy.filters.http.cors
    typed_config:
      "@type": type.googleapis.com/envoy.extensions.filters.http.cors.v3.CorsPolicy
  - name: envoy.filters.http.router
    typed_config:
      "@type": type.googleapis.com/envoy.extensions.filters.http.router.v3.Router`}</code>
                  </pre>
                </div>
              </motion.div>

              {/* Service Cluster Configuration */}
              <motion.div
                className="bg-background shadow-md rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-2xl font-bold mb-4">
                  Service Cluster Configuration
                </h2>
                <div className="bg-muted rounded-md p-4 overflow-auto">
                  <pre className="text-sm md:text-base whitespace-pre-wrap">
                    <code>{`- name: federated-learning-envoy-service
  connect_timeout: 1.25s
  type: strict_dns
  lb_policy: round_robin
  load_assignment:
    cluster_name: federated-learning-envoy-service
    endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: federated-learning-service
                port_value: 6002`}</code>
                  </pre>
                </div>
              </motion.div>
            </div>

            {/* Right Section */}
            <div className="flex-1 bg-background rounded-lg p-6 flex flex-col justify-center">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Title */}
                <div>
                  <h1 className="text-2xl md:text-5xl font-medium">Envoy</h1>
                  <p className="text-lg text-muted-foreground mt-2">
                    High-performance proxy for microservices and cloud-native
                    applications.
                  </p>
                </div>

                {/* Key Points */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Network className="h-6 w-6" />
                    <div>
                      <h2 className="text-lg font-semibold">
                        Gateway & Protocol
                      </h2>
                      <p className="text-muted-foreground">
                        Supports HTTP & gRPC traffic with filters like grpc_web,
                        cors, and router.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Shield className="h-6 w-6" />
                    <div>
                      <h2 className="text-lg font-semibold">
                        CORS Configuration
                      </h2>
                      <p className="text-muted-foreground">
                        Allows all origins (*), supports multiple HTTP methods,
                        with a 20-day max age.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Server className="h-6 w-6" />
                    <div>
                      <h2 className="text-lg font-semibold">Load Balancing</h2>
                      <p className="text-muted-foreground">
                        Uses round-robin policy with 4 backend services and
                        1.25s connection timeout.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Settings className="h-6 w-6" />
                    <div>
                      <h2 className="text-lg font-semibold">Admin Interface</h2>
                      <p className="text-muted-foreground">
                        Access logs on port 9901 for monitoring and debugging.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </CarouselItem>
  );
}
