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
    update: async (
      _,
      {
        id,
        first_name,
        last_name,
        email,
        gender,
        designation,
        salary,
        date_of_joining,
        department,
      },
    ) => {
      const employee = await Employee.findByIdAndUpdate(id, {
        first_name,
        last_name,
        email,
        gender,
        designation,
        salary,
        date_of_joining,
        department
      }, { new: true });
      return employee;
    },
    delete: async (_, { id }) => {
      const result = await Employee.findByIdAndDelete(id);
      return !!result;
    }
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