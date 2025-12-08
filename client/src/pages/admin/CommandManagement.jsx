//here, i manage all commands-(crud)
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  listCommands,
  createCommand,
  updateCommand,
  deleteCommand,
} from '../../redux/actions/commandActions';
import {
  COMMAND_CREATE_RESET,
  COMMAND_UPDATE_RESET,
} from '../../redux/constants/commandConstants';

const CommandManagement = () => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCommand, setCurrentCommand] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    output: '',
    description: '',
    isCoreCommand: false,
    showInHeader: true,
  });

  const { commands, loading } = useSelector((state) => state.commandList);
  const {
    success: createSuccess,
    error: createError,
  } = useSelector((state) => state.commandCreate);
  const {
    success: updateSuccess,
    error: updateError,
  } = useSelector((state) => state.commandUpdate);
  const {
    success: deleteSuccess,
    error: deleteError,
  } = useSelector((state) => state.commandDelete);

  const resetForm = () => {
    setFormData({
      name: '',
      output: '',
      description: '',
      isCoreCommand: false,
      showInHeader: true,
    });
    setEditMode(false);
    setCurrentCommand(null);
  };

  useEffect(() => {
    dispatch(listCommands());

    if (createSuccess || updateSuccess) {
      setShowModal(false);
      resetForm();
      dispatch({ type: COMMAND_CREATE_RESET });
      dispatch({ type: COMMAND_UPDATE_RESET });
      dispatch(listCommands());
    }

    if (deleteSuccess) {
      dispatch(listCommands());
    }
  }, [dispatch, createSuccess, updateSuccess, deleteSuccess]);

  

  const handleOpenModal = (command = null) => {
    if (command) {
      setEditMode(true);
      setCurrentCommand(command);
      setFormData({
        name: command.name,
        output: command.output,
        description: command.description,
        isCoreCommand: command.isCoreCommand,
        showInHeader: command.showInHeader,
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      dispatch(updateCommand(currentCommand._id, formData));
    } else {
      dispatch(createCommand(formData));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this command?')) {
      dispatch(deleteCommand(id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-terminal-text">Command Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-terminal-prompt text-terminal-bg font-semibold rounded hover:bg-terminal-text transition-colors"
        >
          + Add Command
        </button>
      </div>

      {/*info box */}
      <div className="mb-6 p-4 bg-terminal-prompt/10 border border-terminal-prompt/30 rounded-lg">
        <p className="text-terminal-text text-sm">
          <strong>Note:</strong> Core commands like "help", "clear", "projects", and "project" are built-in. 
          You can create custom commands that will be available in the terminal.
        </p>
      </div>

      {/*error messages */}
      {(createError || updateError || deleteError) && (
        <div className="mb-4 p-4 bg-terminal-error/10 border border-terminal-error rounded text-terminal-error">
          {createError || updateError || deleteError}
        </div>
      )}

      {/*commands grid*/}
      {loading ? (
        <div className="text-terminal-text text-center py-8">Loading commands...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {commands?.map((command) => (
            <div
              key={command._id}
              className="bg-terminal-bg/50 border border-terminal-text/20 rounded-lg p-4 hover:border-terminal-prompt/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-terminal-prompt font-mono font-bold text-lg">
                    {command.name}
                  </h3>
                  <p className="text-terminal-text/70 text-sm mt-1">
                    {command.description}
                  </p>
                </div>
              </div>

              <div className="mb-3 p-3 bg-terminal-bg rounded border border-terminal-text/10">
                <p className="text-terminal-text text-xs font-mono whitespace-pre-wrap">
                  {command.output.length > 100
                    ? command.output.substring(0, 100) + '...'
                    : command.output}
                </p>
              </div>

              <div className="flex items-center gap-2 mb-3">
                {command.isCoreCommand && (
                  <span className="px-2 py-1 bg-terminal-prompt/20 border border-terminal-prompt/30 rounded text-terminal-prompt text-xs">
                    Core
                  </span>
                )}
                {command.showInHeader && (
                  <span className="px-2 py-1 bg-terminal-text/10 border border-terminal-text/20 rounded text-terminal-text text-xs">
                    Visible
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(command)}
                  className="flex-1 px-3 py-2 bg-terminal-prompt/10 border border-terminal-prompt/30 rounded text-terminal-prompt hover:bg-terminal-prompt/20 transition-colors text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(command._id)}
                  className="flex-1 px-3 py-2 bg-terminal-error/10 border border-terminal-error/30 rounded text-terminal-error hover:bg-terminal-error/20 transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(!commands || commands.length === 0) && !loading && (
        <div className="text-center py-12 text-terminal-text/50">
          No commands found. Create your first command!
        </div>
      )}

      {/*modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-terminal-bg border border-terminal-text/20 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-terminal-text mb-4">
              {editMode ? 'Edit Command' : 'Add New Command'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-terminal-text mb-2 text-sm">
                  Command Name * (lowercase, no spaces)
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  pattern="[a-z0-9-]+"
                  className="w-full px-4 py-2 bg-terminal-bg border border-terminal-text/30 rounded text-terminal-text focus:outline-none focus:border-terminal-prompt font-mono"
                  placeholder="about"
                />
              </div>

              <div>
                <label className="block text-terminal-text mb-2 text-sm">Description *</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-terminal-bg border border-terminal-text/30 rounded text-terminal-text focus:outline-none focus:border-terminal-prompt"
                  placeholder="Shows information about me"
                />
              </div>

              <div>
                <label className="block text-terminal-text mb-2 text-sm">
                  Command Output *
                </label>
                <textarea
                  name="output"
                  value={formData.output}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-2 bg-terminal-bg border border-terminal-text/30 rounded text-terminal-text focus:outline-none focus:border-terminal-prompt font-mono text-sm"
                  placeholder="This is the text that will be displayed when the command is executed..."
                />
                <p className="text-terminal-text/50 text-xs mt-1">
                  This text will be displayed with typing effect when the command is executed
                </p>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isCoreCommand"
                    checked={formData.isCoreCommand}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-terminal-text text-sm">Core Command</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="showInHeader"
                    checked={formData.showInHeader}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-terminal-text text-sm">Show in Help</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-terminal-prompt text-terminal-bg font-semibold rounded hover:bg-terminal-text transition-colors"
                >
                  {editMode ? 'Update Command' : 'Create Command'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-3 bg-terminal-text/10 border border-terminal-text/30 text-terminal-text rounded hover:bg-terminal-text/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandManagement;