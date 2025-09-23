const supabase = require("../config/supabase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTRAR USUARIO

exports.register = async (req, res) => {
  const { nome_usuario, nome, email, senha } = req.body;

  try {
    const senhaHash = await bcrypt.hash(senha, 10);

    const { data, error } = await supabase
      .from("usuario")
      .insert([{ nome_usuario, nome, email, senha: senhaHash }])
      .select();

    if (error) throw error;

    res.status(201).json({ message: "Usuário registrado com sucesso", usuario: data[0]});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// EDITAR INFORMAÇÕES DO USUARIO

exports.updateUser = async (req, res) =>{
  const {nome_usuario} = req.params;
  const{nome, email} = req.body;

  try {
    const {data,error} = await supabase
    .from("usuario")
    .update({nome,email})
    .eq("nome_usuario", nome_usuario)
    .select();

    if (error) throw error;
    res.json({message: "Usuario atualizado com sucesso!", usuario: data[0]});

  }catch(err) {
    res.status(400).json({error: err.message});
  }
;
}

// ALTERAR SENHA

exports.updatePassword = async (req, res) => {
  const{id} = req.params;
  const{senha_antiga, nova_senha} = req.body;

  try{
    const{data,error} = await supabase
      .from("usuario")
      .select("senha")
      .eq("nome_usuario", nome_usuario)
      .single();

    if (error || !data) throw new Error("Usuario não encontrado");

    const senhaValida = await bcrypt.compare(senha_antiga,data.senha);
    if(!senhaValida) throw new Error("Senha antiga incorreta");

    const novaSenhaHash = await bcrypt.hash(nova_senha, 10);

    const{ error: updateError } = await supabase
      .from("usuario")
      .update({senha: novaSenhaHash})
      .eq("id", id);

    if (updateError) throw updateError;

    res.json({message: "Senha atualizada com sucesso!"});
    
    
  } catch(err) {
    res.status(400).json({error: err.message});
  }
}

// LOGIN USUARIO

exports.login = async (req, res) => {
  const { nome_usuario, senha } = req.body;

  try {
    const { data, error } = await supabase
      .from("usuario")
      .select("*")
      .eq("nome_usuario", nome_usuario)
      .single();

    if (error || !data) throw new Error("Usuário não encontrado");

    const senhaValida = await bcrypt.compare(senha, data.senha);
    if (!senhaValida) throw new Error("Senha incorreta");

    const token = jwt.sign({ id: data.id, nome_usuario: data.nome_usuario }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    res.json({ message: "Login realizado", token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};