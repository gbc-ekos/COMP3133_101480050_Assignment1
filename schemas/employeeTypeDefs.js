import gql from "graphql-tag";

const employeeTypeDefs = gql`
  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String
    deignation: String
    salary: Float!
    date_of_joining: String!
    department: String
    employee_photo: String
    created_at: String
    updated_at: String
  }

  type Mutation {
    add(
      first_name: String!
      last_name: String!
      email: String!
      gender: String
      designation: String!
      salary: Float!
      date_of_joining: String!
      department: String
      employee_photo: String
    ): Employee!

    update(
      id: ID!
      first_name: String
      last_name: String
      email: String
      gender: String
      designation: String
      salary: Float
      date_of_joining: String
      department: String
    ): Employee!

    delete(id: ID!): Boolean
  }

  type Query {
    employees: [Employee]
    employee(id: ID!): Employee
    employeesByDepartment(department: String!): [Employee]
    employeesByDesignation(designation: String!): [Employee]
  }
`;

export default employeeTypeDefs;
