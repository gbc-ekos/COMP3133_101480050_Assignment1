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
      context,
    ) => {
      if (!context.user) throw new Error("Unauthorized. Please log in.");

      const employee = await Employee.create({
        first_name,
        last_name,
        email,
        gender,
        designation,
        salary,
        date_of_joining,
        department,
        employee_photo,
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
      context,
    ) => {
      if (!context.user) throw new Error("Unauthorized. Please log in.");

      const employee = await Employee.findByIdAndUpdate(
        id,
        {
          first_name,
          last_name,
          email,
          gender,
          designation,
          salary,
          date_of_joining,
          department,
        },
        { new: true },
      );
      return employee;
    },

    delete: async (_, { id }, context) => {
      if (!context.user) throw new Error("Unauthorized. Please log in.");
      const result = await Employee.findByIdAndDelete(id);
      return !!result;
    },
  },

  Query: {
    employees: async (_, __, context) => {
      if (!context.user) throw new Error("Unauthorized. Please log in.");
      return await Employee.find();
    },
    employee: async (_, { id }, context) => {
      if (!context.user) throw new Error("Unauthorized. Please log in.");
      return await Employee.findById(id);
    },
    employeesByDepartment: async (_, { department }, context) => {
      if (!context.user) throw new Error("Unauthorized. Please log in.");
      return await Employee.find({ department });
    },
    employeesByDesignation: async (_, { designation }, context) => {
      if (!context.user) throw new Error("Unauthorized. Please log in.");
      return await Employee.find({ designation });
    },
  },
};

export default employeeResolvers;
