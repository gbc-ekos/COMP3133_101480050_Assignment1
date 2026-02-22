import Employee from "../models/Employee.js";

const employeeResolvers = {
  Mutation: {
    add: async (
      _,
      {
        first_name,
        last_name,
        email,
        gender,
        designation,
        salary,
        date_of_joining,
        department,
        employee_photo,
      },
    ) => {
        const employee = await Employee.create({
          first_name,
          last_name,
          email,
          gender,
          designation,
          salary,
          date_of_joining,
          department,
          employee_photo
        });
        return employee;
    },
  },
  Query: {
    employees: async () => await Employee.find(),
    employee: async (_, { id }) => await Employee.findById(id),
    employeesByDepartment: async (_, { department }) =>
      await Employee.find({ department }),
    employeesByDesignation: async (_, { designation }) =>
      await Employee.find({ designation }),
  },
};

export default employeeResolvers;