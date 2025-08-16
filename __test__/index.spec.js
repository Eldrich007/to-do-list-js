const {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
} = require("../index.js");

jest.mock("prompt-sync", () => {
  const mockPrompt = jest.fn();
  return () => mockPrompt;
});

describe("To-Do List Functions", () => {
  let mockPrompt;

  beforeEach(() => {
    todos.length = 0;
    mockPrompt = require("prompt-sync")();
    mockPrompt.mockClear();
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("generateUniqueId", () => {
    it("should generate unique IDs", () => {
      const id1 = generateUniqueId();
      const id2 = generateUniqueId();
      expect(id1).not.toBe(id2);
    });
  });

  describe("addTodo", () => {
    it("should add a todo", () => {
      mockPrompt.mockReturnValueOnce("Test todo");
      addTodo();
      expect(todos.length).toBe(1);
    });

    it("should reject empty input", () => {
      mockPrompt.mockReturnValueOnce("");
      addTodo();
      expect(todos.length).toBe(0);
    });
  });

  describe("markTodoCompleted", () => {
    beforeEach(() => {
      todos.push({ id: "1", text: "Test", isCompleted: false });
    });

    it("should handle negative numbers", () => {
      mockPrompt.mockReturnValueOnce("-1");
      markTodoCompleted();
      expect(console.log).toHaveBeenCalledWith(
        "Invalid number. Please enter a valid number from the list."
      );
    });

    it("should handle zero input", () => {
      mockPrompt.mockReturnValueOnce("0");
      markTodoCompleted();
      expect(console.log).toHaveBeenCalledWith(
        "Invalid number. Please enter a valid number from the list."
      );
    });
  });

  describe("deleteTodo", () => {
    beforeEach(() => {
      todos.push({ id: "1", text: "Test", isCompleted: false });
    });

    it("should handle empty input", () => {
      mockPrompt.mockReturnValueOnce(""); // Simulasikan input kosong
      deleteTodo();
      expect(console.log).toHaveBeenCalledWith(
        "Invalid number. Please enter a valid number from the list."
      );
    });

    it("should handle out of range input", () => {
      mockPrompt.mockReturnValueOnce("2"); // Hanya ada 1 todo (index 0-1)
      deleteTodo();
      expect(console.log).toHaveBeenCalledWith(
        "Invalid number. Please enter a valid number from the list."
      );
    });
  });

  describe("listTodos", () => {
    it("should show empty list", () => {
      listTodos();
      expect(console.log).toHaveBeenCalledWith("No to-dos to display.");
    });

    it("should list todos", () => {
      todos.push({ id: "1", text: "Test", isCompleted: false });
      listTodos();
      expect(console.log).toHaveBeenCalledWith("1. [ACTIVE] | Test");
    });
  });

  describe("runTodoApp", () => {
    it("should handle all command variants", () => {
      const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});

      // Test semua variasi perintah (text dan numeric)
      mockPrompt
        .mockReturnValueOnce("add")
        .mockReturnValueOnce("Test todo")
        .mockReturnValueOnce("1") // numeric add
        .mockReturnValueOnce("Test todo 2")
        .mockReturnValueOnce("complete")
        .mockReturnValueOnce("1")
        .mockReturnValueOnce("2") // numeric complete
        .mockReturnValueOnce("1")
        .mockReturnValueOnce("delete")
        .mockReturnValueOnce("1")
        .mockReturnValueOnce("3") // numeric delete
        .mockReturnValueOnce("1")
        .mockReturnValueOnce("list")
        .mockReturnValueOnce("4") // numeric list
        .mockReturnValueOnce("start wrong") // wrong
        .mockReturnValueOnce("exit")
        .mockReturnValueOnce("5"); // numeric exit

      runTodoApp();

      mockExit.mockRestore();
    });
  });
});
