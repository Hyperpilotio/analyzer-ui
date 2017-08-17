export const STAGE_CONFIG = 0;
export const STAGE_TEST = 1;
export const STAGE_RESULT = 2;
export const ADD_ALL = "ADD_ALL";
export const TOGGLE_SELECTED = "TOGGLE_SELECTED";

export const sampleSizingAnalysisData = {
  "_id" : "598ce792b88e775263ead59c",
  "sessionId" : "hyperpilot-sizing-demo-3-horray",
  "appName" : "redis",
  "sloType" : "throughput",
  "sloValue" : 50000,
  "budget" : 300,
  "sizingRuns" : [
    {
      "run" : 1,
      "samples" : 3,
      "results" : [
        {
          "nodetype" : "r4.2xlarge",
          "status" : "done",
          "qosValue" : 480000,
          "cost" : 241.92000000000002,
          "perfOverCost" : 1984.126984126984
        },
        {
          "nodetype" : "d2.xlarge",
          "status" : "done",
          "qosValue" : 240000,
          "cost" : 289.44,
          "perfOverCost" : 829.1873963515754
        },
        {
          "nodetype" : "m3.2xlarge",
          "status" : "done",
          "qosValue" : 480000,
          "cost" : 273.6,
          "perfOverCost" : 1754.3859649122805
        }
      ]
    },
    {
      "run" : 2,
      "samples" : 3,
      "results" : [
        {
          "nodetype" : "c4.8xlarge",
          "status" : "done",
          "qosValue" : 2160000,
          "cost" : 725.76,
          "perfOverCost" : 2976.190476190476
        },
        {
          "nodetype" : "x1.16xlarge",
          "status" : "done",
          "qosValue" : 3840000,
          "cost" : 2959.2000000000003,
          "perfOverCost" : 1297.64801297648
        },
        {
          "nodetype" : "m4.10xlarge",
          "status" : "done",
          "qosValue" : 2400000,
          "cost" : 892.0800000000002,
          "perfOverCost" : 2690.3416733925205
        }
      ]
    },
    {
      "run" : 3,
      "samples" : 3,
      "results" : [
        {
          "nodetype" : "c4.4xlarge",
          "status" : "done",
          "qosValue" : 960000,
          "cost" : 362.88,
          "perfOverCost" : 2645.5026455026455
        },
        {
          "nodetype" : "g3.8xlarge",
          "status" : "done",
          "qosValue" : 1920000,
          "cost" : 1120.392,
          "perfOverCost" : 1713.68592421224
        },
        {
          "nodetype" : "cr1.8xlarge",
          "status" : "done",
          "qosValue" : 1920000,
          "cost" : 1216.08,
          "perfOverCost" : 1578.8434971383463
        }
      ]
    },
    {
      "run" : 4,
      "samples" : 3,
      "results" : [
        {
          "nodetype" : "m4.4xlarge",
          "status" : "done",
          "qosValue" : 960000,
          "cost" : 356.832,
          "perfOverCost" : 2690.341673392521
        },
        {
          "nodetype" : "r4.8xlarge",
          "status" : "done",
          "qosValue" : 1920000,
          "cost" : 967.6800000000001,
          "perfOverCost" : 1984.126984126984
        },
        {
          "nodetype" : "d2.8xlarge",
          "status" : "done",
          "qosValue" : 2160000,
          "cost" : 2315.52,
          "perfOverCost" : 932.8358208955224
        }
      ]
    },
    {
      "run" : 5,
      "samples" : 3,
      "results" : [
        {
          "nodetype" : "i3.8xlarge",
          "status" : "done",
          "qosValue" : 1920000,
          "cost" : 1234.08,
          "perfOverCost" : 1555.8148580318943
        },
        {
          "nodetype" : "p2.8xlarge",
          "status" : "done",
          "qosValue" : 1920000,
          "cost" : 3538.08,
          "perfOverCost" : 542.667209333876
        },
        {
          "nodetype" : "i2.8xlarge",
          "status" : "done",
          "qosValue" : 1920000,
          "cost" : 2442.2400000000002,
          "perfOverCost" : 786.1635220125786
        }
      ]
    }
  ],
  "status" : "complete",
  "recommendations" : [
    {
      "nodetype" : "c4.8xlarge",
      "objective" : "MaxPerfOverCost"
    },
    {
      "nodetype" : "r4.2xlarge",
      "objective" : "MinCostWithPerfLimit"
    },
    {
      "nodetype" : "m3.2xlarge",
      "objective" : "MaxPerfWithCostLimit"
    }
  ]
};

export const sampleInstancesData = [
  {
    "name" : "m3.2xlarge",
    "cpu" : "8 x 2.5GHz",
    "memory" : "30GiB",
    "storage" : "SSD 2x80GB",
    "network" : "High"
  },
  {
    "name" : "i3.8xlarge",
    "cpu" : "32 x 2.3GHz",
    "memory" : "244GiB",
    "storage" : "NVMe 4x1.9GB",
    "network" : "10 Gigabit"
  },
  {
    "name" : "p2.8xlarge",
    "cpu" : "32 x 0GHz",
    "memory" : "488GiB",
    "storage" : "EBS only",
    "network" : "10 Gigabit"
  },
  {
    "name" : "g3.8xlarge",
    "cpu" : "32 x 2.3GHz",
    "memory" : "244GiB",
    "storage" : "EBS only",
    "network" : "10 Gigabit"
  },
  {
    "name" : "c4.8xlarge",
    "cpu" : "36 x 2.9GHz",
    "memory" : "60GiB",
    "storage" : "EBS only",
    "network" : "10 Gigabit"
  },
  {
    "name" : "d2.8xlarge",
    "cpu" : "36 x 2.4GHz",
    "memory" : "244GiB",
    "storage" : "HDD 24x2000GB",
    "network" : "10 Gigabit"
  },
  {
    "name" : "c4.4xlarge",
    "cpu" : "16 x 2.9GHz",
    "memory" : "30GiB",
    "storage" : "EBS only",
    "network" : "High"
  },
  {
    "name" : "r4.2xlarge",
    "cpu" : "8 x 2.3GHz",
    "memory" : "61GiB",
    "storage" : "EBS only",
    "network" : "Up to 10 Gigabit"
  },
  {
    "name" : "d2.xlarge",
    "cpu" : "4 x 2.4GHz",
    "memory" : "30.5GiB",
    "storage" : "HDD 3x2000GB",
    "network" : "Moderate"
  },
  {
    "name" : "m4.4xlarge",
    "cpu" : "16 x 2.4GHz",
    "memory" : "64GiB",
    "storage" : "EBS only",
    "network" : "High"
  },
  {
    "name" : "x1.16xlarge",
    "cpu" : "64 x 2.3GHz",
    "memory" : "976GiB",
    "storage" : "HDD 1x1920GB",
    "network" : "High"
  },
  {
    "name" : "r4.8xlarge",
    "cpu" : "32 x 2.3GHz",
    "memory" : "244GiB",
    "storage" : "EBS only",
    "network" : "10 Gigabit"
  },
  {
    "name" : "m4.10xlarge",
    "cpu" : "40 x 2.4GHz",
    "memory" : "160GiB",
    "storage" : "EBS only",
    "network" : "10 Gigabit"
  }
];
