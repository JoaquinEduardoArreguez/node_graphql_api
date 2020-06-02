# node_graphql_api
Workshop showing graphql api with node.

**Commit 8e0126d8bfb6be272320f5a440766e1597ad824d**  
contains fully implemented API with validation methods to mantain data integrity.

**Commit a18467d8b9d14b3219f956998d4ddc067d6302b3**  
contains the same, fully implemented API,
but without data/operation validation methods, data integrity is not taken in account.


**Pre-requisites**

1) Create 3 JSON files with Course, Student and Grade  
2) Course have an id, name and description  
3) Student have id, name, lastname, courseId (Assumption: 1 student only can be in one course)  
4) Grade have id, courseId, studentId, grade  

**Create a Graphql structure in order to :**

1) Query all Courses, Students and Grades  
2) Query by id a Course, Student and Grade  
3) Create a Course, Student and Grade  
4) Delete a Course, Student and Grade  
