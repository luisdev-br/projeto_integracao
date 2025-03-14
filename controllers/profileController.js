const Profile = require("../models/Profile");

// Criar um perfil
const createProfile = async (req, res) => {
  const { occupation, phone, address } = req.body;
  const userId = req.userId; // Obtém o ID do usuário autenticado

  try {
    const newProfile = new Profile({
      occupation,
      phone,
      address,
      userId,
    });

    const savedProfile = await newProfile.save();
    res.status(201).json({
      message: "Perfil criado com sucesso!",
      profile: savedProfile,
    });
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar perfil", error: err });
  }
};

// Listar todos os perfis
const getAllProfiles = async (req, res) => {
  const userId = req.userId; // Obtém o ID do usuário autenticado

  try {
    const profiles = await Profile.find({ userId });
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar perfis", error: err });
  }
};

// Atualizar um perfil
const editProfile = async (req, res) => {
  const { id } = req.params;
  const { occupation, phone, address } = req.body;

  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      { occupation, phone, address },
      { new: true } // Retorna o perfil atualizado
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Perfil não encontrado!" });
    }

    res.json({
      message: "Perfil atualizado com sucesso!",
      profile: updatedProfile,
    });
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar perfil", error: err });
  }
};

// Excluir um perfil
const deleteProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProfile = await Profile.findByIdAndDelete(id);

    if (!deletedProfile) {
      return res.status(404).json({ message: "Perfil não encontrado!" });
    }

    res.json({ message: "Perfil excluído com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao excluir perfil", error: err });
  }
};

module.exports = { createProfile, getAllProfiles, editProfile, deleteProfile };