from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from sqlmodel import Session, select
from sqlalchemy.exc import IntegrityError

from typing import Annotated, List
import time
import json

# from src.TasksList import TasksList
# from src.TasksListMessages import TasksListMessages
from src.database import engine, is_db_up
from src.migration import migrate_database
from src.authentication import create_access_token, get_current_user, authenticate_user
from src.utils import get_password_hash
from src.error import error_details, Error
from src.logger import logger

import src.models as models



@asynccontextmanager
async def lifespan(app: FastAPI):
    while not is_db_up():
        logger.error("Database is not available, retrying...")
        time.sleep(5)
    migrate_database()

    yield

    # Code at the end of the lifespan context manager will be executed after the app is shut down

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/health')
def health() -> str:
    return 'ok'



@app.get('/offer')
def get_baseline_predecessors(
        token: str
    ):
    time.sleep(5)
    return [
        {
            'type': 'markdown',
            'data': '''
# Project Plan  {#custom-id}

## Overview

This is a project plan for the development of a new product. The plan includes a list of tasks and a Gantt chart.

## Tasks

Link to heading: [Heading IDs](#custom-id)

List of tasks for the project:

- [x] Task 1
- [ ] Task 2
- [ ] Task 3


1. test:

    - test
    - test2

2. jkjfk
3. nklj


- cos tam
- jeszcze cos
            
> :warning: **Warning:** Do not push the big red button.

> :heart: **Note:** Sunrises are beautiful.

> :tada: **Tip:** Remember to appreciate the little things in life.



```c
#include <stdio.h>
int main(){
  return 0;
}
```



``` mermaid
---
title: Node
---
flowchart LR
    id
```

``` mermaid
mindmap
  root((mindmap))
    Origins
      Long history
      ::icon(fa fa-book)
      Popularisation
        British popular psychology author Tony Buzan
    Research
      On effectiveness<br/>and features
      On Automatic creation
        Uses
            Creative techniques
            Strategic planning
            Argument mapping
    Tools
      Pen and paper
      Mermaid
```


``` mermaid
gantt
    dateFormat  YYYY-MM-DD
    title       Adding GANTT diagram functionality to mermaid
    excludes    weekends
    %% (`excludes` accepts specific dates in YYYY-MM-DD format, days of the week ("sunday") or "weekends", but not the word "weekdays".)

    section A section
    Completed task            :done,    des1, 2014-01-06,2014-01-08
    Active task               :active,  des2, 2014-01-09, 3d
    Future task               :         des3, after des2, 5d
    Future task2              :         des4, after des3, 5d

    section Critical tasks
    Completed task in the critical line :crit, done, 2014-01-06,24h
    Implement parser and jison          :crit, done, after des1, 2d
    Create tests for parser             :crit, active, 3d
    Future task in critical line        :crit, 5d
    Create tests for renderer           :2d
    Add to mermaid                      :until isadded
    Functionality added                 :milestone, isadded, 2014-01-25, 0d

    section Documentation
    Describe gantt syntax               :active, a1, after des1, 3d
    Add gantt diagram to demo page      :after a1  , 20h
    Add another diagram to demo page    :doc1, after a1  , 48h

    section Last section
    Describe gantt syntax               :after doc1, 3d
    Add gantt diagram to demo page      :20h
    Add another diagram to demo page    :48h
```


```mermaid
erDiagram
	FOO ||--|{ BAR :baz
```

                '''
        },
        {
            'type': 'gantt',
            'data': [
                {
                    'id': "1",
                    'name': "Development",
                    'actualStart': "2018-01-25",
                    'actualEnd': "2018-03-10"
                },
                {
                    'id': "1_2",
                    'parent': "1",
                    'name': "Analysis",
                    'actualStart': "2018-01-25",
                    'actualEnd': "2018-02-08"
                },
                {
                    'id': "1_3",
                    'parent': "1",
                    'name': "Design",
                    'actualStart': "2018-02-04",
                    'actualEnd': "2018-02-14"
                },
                {
                    'id': "1_4",
                    'parent': "1",
                    'name': "Meeting",
                    'actualStart': "2018-02-15",
                    'actualEnd': "2018-02-15"
                },
                {
                    'id': "1_5",
                    'parent': "1",
                    'name': "Implementation",
                    'actualStart': "2018-02-15",
                    'actualEnd': "2018-02-27"
                },
                {
                    'id': "1_6",
                    'parent': "1",
                    'name': "Testing",
                    'actualStart': "2018-02-28",
                    'actualEnd': "2018-03-10"
                },
                {
                    'id': "2",
                    'name': "PR Campaign",
                    'actualStart': "2018-02-28",
                    'actualEnd': "2018-03-22"
                },
                {
                    'id': "2_1",
                    'parent': "2",
                    'name': "Planning",
                    'actualStart': "2018-02-15",
                    'actualEnd': "2018-03-10"
                },
                {
                    'id': "2_2",
                    'parent': "2",
                    'name': "Promoting",
                    'actualStart': "2018-03-11",
                    'actualEnd': "2018-03-22"
                }
            ]
        }
    ]


