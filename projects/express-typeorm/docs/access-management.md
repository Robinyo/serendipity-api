# Access Management

## Quick Start

The goal of this guide is to help you understand Serendipity's approach to Access Management.

### Scopes

Scope names follow a simple convention: <namespace>:<operation> where <namespace> refers to a resource (e.g., document,
collection, store, and controller) and <operation> refers to the action to be performed on the resource.

### Individual Scopes

| Name                   | Description                                       |
| ---------------------- | ------------------------------------------------- |
| individuals:read       | Required to view records.                         |
| individuals:read.email | Required to view an Individual's email addresses. |
| individuals:write      | Required to write records.                        |

