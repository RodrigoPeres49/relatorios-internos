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
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};