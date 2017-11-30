# UI server API calls

Note that the apis might not follow REST API conventions, but the purpose here for UI server is just to make it as simple as possible for frontend code.

### 1. Create App: POST `/api/new-app`

Body:
```
{
    "name": "app-name",
    "type": "long-running" // or "batch-processing"
}
```

Response:
```
{
    "success": true,
    "data": {
        "app_id": "app-name-c289ca8df982-92889c-2892-2983929",
        "name": "app-name",
        "type": "long-running",
        "state": "Registered"
    }
}
```

## 2. Select Microservices

### 2-1. Get cluster mapping: GET `/api/get-cluster-mapping`

Response:
```
{
    "success": true,
    "data": [
        {
            "namespace": "default",
            "deployments": ["deployment1", "deployment2", "deployment3"],
            "statefulsets": ["statefulset1", "statefulset2"],
            "services": ["service1", "service2", "service3", "service4"]
        },
        { ... }
    ]
}
```

### 2-2. Save selected microservices: POST `/api/save-microservices`
Body:
```
{
    "app_id": "app-name-c289ca8df982-92889c-2892-2983929",
    "microservices": [
        { "namespace": "default", "kind": "deployments", "name": "deployment1" },
        { "namespace": "default", "kind": "services", "name": "service2" }
    ]
}
```

Response:
```
{
    "success": true,
    "data": {
        "app_id": "app-name-c289ca8df982-92889c-2892-2983929",
        "name": "app-name",
        "type": "long-running",
        "microservices": [
            {
                "service_id": "service-0309410230941093204910"
                "namespace": "default",
                "kind": "deployments",
                "name": "deployment1"
            },
            {
                "service_id": "service-13984819283941438"
                "namespace": "default",
                "kind": "services",
                "name": "service2",
            }
        ]
        "state": "Registered"
    }
}
```

## 3. SLO Definition

### 3-1. Get metrics with service name: POST `/api/get-metrics`

Body:
```
{
    "APM_type": "prometheus",
    "port": 8080,
    "service": {
        "namespace": "default",
        "type": "statefulset",
        "name": "statefulset1"
    }
}
```

Response:
```
{
    "success": true,
    "metrics": ["metric1", "metric2", ...]
}
```

### 3-2. Save SLO config: POST `/api/update-app`

Body:
```
{
    "app_id": "app-name-c289ca8df982-92889c-2892-2983929",
    "slo": {
        "source": {
            "APM_type": "prometheus",
            "port": 8080,
            "service": {
                "namespace": "default",
                "type": "statefulset",
                "name": "statefulset1"
            }
        },
        "metric": "some_metric_existing_in_prometheus",
        "summary": "95p",
        "value": 500,
        "unit": "ms"
    }
}
```

Response:
```
{
    "success": true,
    "data": { full updated app json }
}
```

### 4. Management features configurations: POST `/api/update-app`
Body:
```
{
    "app_id": "app-name-c289ca8df982-92889c-2892-2983929",
    "management_features": [values from form]
}
```

Response:
```
{
    "success": true,
    "data": { full updated app json }
}
```
