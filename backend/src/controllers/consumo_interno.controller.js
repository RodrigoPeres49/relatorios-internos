const supabase = require("../config/supabase");

// CADASTRAR O CONSUMO INTERNO

exports.cadastrarConsumoInterno = async (req, res) => {
  const { produto, data, quantidade, preco } = req.body;
  const usuario_id = req.user.id; 

  try {
    const { data: result, error } = await supabase
      .from("relatorio_consumo_interno")
      .insert([{ produto, data, quantidade, preco, usuario_id }])
      .select();

    if (error) throw error;

    res.status(201).json(result[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// LISTAR CONSUMO INTERNO

exports.listarConsumoInterno = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("relatorio_consumo_interno")
      .select(`
        id,
        produto,
        data,
        quantidade,
        preco,
        valor_total,
        created_at,
        usuario:usuario_id ( nome_usuario )
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// EDITAR CONSUMO INTERNO

exports.editarConsumoInterno = async (req, res) => {
  const { id } = req.params;
  const { produto, data, quantidade, preco } = req.body;
  const usuario_id = req.user.id; // ID do usuário autenticado

  try {
    const { data: result, error } = await supabase
      .from("relatorio_consumo_interno")
      .update({ produto, data, quantidade, preco, usuario_id }) // atualiza também o dono
      .eq("id", id)
      .select();

    if (error) throw error;

    if (result.length === 0) {
      return res.status(404).json({ error: "Registro não encontrado" });
    }

    res.json(result[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETAR CONSUMO INTERNO

exports.deletarConsumoInterno = async (req, res) => {
  const { id } = req.params;

  try {
    const { data: result, error } = await supabase
      .from("relatorio_consumo_interno")
      .delete()
      .eq("id", id)
      .select();

    if (error) throw error;

    if (result.length === 0) {
      return res.status(404).json({ error: "Registro não encontrado" });
    }

    res.json({ message: "Registro deletado com sucesso!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};