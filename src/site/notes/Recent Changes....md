---
{"dg-publish":true,"permalink":"/recent-changes/","pinned":"true","noteIcon":"","dg-note-properties":{}}
---


```base
formulas:
  Untitled: ""
views:
  - type: table
    name: Table
    filters:
      and:
        - note["dg-publish"] == true
    order:
      - file.name
      - file.mtime
      - formula.Untitled
    sort:
      - property: file.mtime
        direction: DESC

```

