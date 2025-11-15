// Base de conhecimento do assistente virtual

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  buttons?: ChatButton[];
  feedback?: 'useful' | 'not-useful' | null;
}

export interface ChatButton {
  label: string;
  action: 'link' | 'message' | 'contact';
  value: string;
}

export interface KnowledgeItem {
  category: string;
  keywords: string[];
  response: string;
  buttons?: ChatButton[];
}

// Base de conhecimento com perguntas e respostas
export const knowledgeBase: KnowledgeItem[] = [
  // 1. Pedidos e Entregas
  {
    category: 'Pedidos e Entregas',
    keywords: ['onde está', 'meu pedido', 'status', 'entrega', 'rastreamento', 'pacote', 'atrasou', 'atraso'],
    response: 'Para verificar o status do seu pedido, por favor, vá em "Minhas Compras" no seu perfil. Lá você poderá ver o status atual de cada item e o código de rastreamento, se disponível. Se precisar de mais ajuda, informe o número do seu pedido.',
    buttons: [
      { label: 'Ver Minhas Compras', action: 'link', value: '/buyer-profile' }
    ]
  },
  {
    category: 'Pedidos e Entregas',
    keywords: ['cancelar', 'pedido', 'cancelamento', 'desistir', 'compra'],
    response: 'O cancelamento de pedidos depende do status atual. Se o pedido ainda não foi processado para envio, você pode tentar cancelá-lo diretamente na página de detalhes do pedido (Minhas Compras > Ver Detalhes). Se já foi enviado, você precisará iniciar um processo de devolução.',
    buttons: [
      { label: 'Ver Minhas Compras', action: 'link', value: '/buyer-profile' },
      { label: 'Falar com Atendente', action: 'contact', value: 'cancelamento' }
    ]
  },
  
  // 2. Devoluções e Trocas
  {
    category: 'Devoluções e Trocas',
    keywords: ['devolução', 'devolver', 'troca', 'trocar', 'produto', 'item', 'defeito', 'errado'],
    response: 'Para iniciar uma devolução ou troca, acesse a seção "Minhas Compras", selecione o pedido e clique em "Solicitar Devolução/Troca". Siga as instruções e preencha o formulário. Você tem até 30 dias após o recebimento para fazer a solicitação.',
    buttons: [
      { label: 'Ver Minhas Compras', action: 'link', value: '/buyer-profile' },
      { label: 'Política de Devolução', action: 'link', value: '/policies/returns' }
    ]
  },
  
  // 3. Pagamentos
  {
    category: 'Pagamentos',
    keywords: ['pagamento', 'não aprovou', 'recusado', 'cartão', 'crédito', 'débito', 'problema', 'erro'],
    response: 'Seu pagamento pode ter sido recusado por diversos motivos (dados incorretos, limite insuficiente, etc.). Por favor, verifique os dados do seu cartão, tente com outro método de pagamento ou entre em contato com seu banco. Se o problema persistir, descreva o erro para que possamos ajudar.',
    buttons: [
      { label: 'Gerenciar Pagamentos', action: 'link', value: '/buyer-profile' },
      { label: 'Falar com Atendente', action: 'contact', value: 'pagamento' }
    ]
  },
  {
    category: 'Pagamentos',
    keywords: ['mudar', 'alterar', 'método', 'pagamento', 'forma', 'após', 'compra'],
    response: 'Após a finalização da compra, o método de pagamento não pode ser alterado. Você precisará cancelar o pedido (se possível) e fazer uma nova compra com o método desejado.',
    buttons: [
      { label: 'Ver Minhas Compras', action: 'link', value: '/buyer-profile' }
    ]
  },
  
  // 4. Conta e Perfil
  {
    category: 'Conta e Perfil',
    keywords: ['endereço', 'email', 'e-mail', 'senha', 'dados', 'pessoais', 'perfil', 'alterar', 'mudar', 'esqueci'],
    response: 'Para atualizar seus dados pessoais, como endereço, telefone ou e-mail, acesse "Dados Pessoais" no seu perfil. Para redefinir sua senha, clique em "Esqueci a senha?" na tela de login, ou em "Alterar Senha" dentro dos Dados Pessoais.',
    buttons: [
      { label: 'Ir para Dados Pessoais', action: 'link', value: '/buyer-profile' },
      { label: 'Recuperar Senha', action: 'link', value: '/auth/reset-password' }
    ]
  },
  
  // 5. Erros Comuns no Site
  {
    category: 'Erros no Site',
    keywords: ['site', 'não carrega', 'carregando', 'página', 'branco', 'erro', 'carrinho', 'adicionar', 'problema técnico'],
    response: 'Lamento que esteja enfrentando problemas! Tente as seguintes soluções:\n\n• Limpe o cache e os cookies do seu navegador\n• Tente usar outro navegador\n• Verifique sua conexão com a internet\n\nSe o problema persistir, descreva o que você estava fazendo e qual a mensagem de erro (se houver). Isso nos ajudará a diagnosticar.',
    buttons: [
      { label: 'Relatar um Erro', action: 'contact', value: 'erro-tecnico' }
    ]
  },
  
  // 6. Atendimento Humano
  {
    category: 'Atendimento',
    keywords: ['atendente', 'humano', 'pessoa', 'falar', 'conversar', 'ajuda', 'suporte'],
    response: 'Entendi! Você gostaria de conversar com um de nossos atendentes. Por favor, clique no botão abaixo para ser direcionado ao nosso suporte ao cliente. Nossa equipe está disponível para ajudá-lo!',
    buttons: [
      { label: 'Falar com Atendente', action: 'contact', value: 'geral' }
    ]
  }
];

// Sugestões rápidas (perguntas frequentes)
export const quickSuggestions = [
  'Onde está meu pedido?',
  'Como faço uma devolução?',
  'Problemas com pagamento',
  'Alterar meus dados',
  'Falar com atendente'
];

// Função de processamento de linguagem natural básico
export function findBestMatch(userMessage: string): KnowledgeItem | null {
  const normalizedMessage = userMessage.toLowerCase().trim();
  
  // Busca por correspondência de palavras-chave
  let bestMatch: KnowledgeItem | null = null;
  let maxMatches = 0;
  
  for (const item of knowledgeBase) {
    let matches = 0;
    
    for (const keyword of item.keywords) {
      if (normalizedMessage.includes(keyword.toLowerCase())) {
        matches++;
      }
    }
    
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = item;
    }
  }
  
  // Retorna apenas se houver pelo menos uma correspondência
  return maxMatches > 0 ? bestMatch : null;
}

// Mensagem padrão quando não encontra correspondência
export const defaultResponse: KnowledgeItem = {
  category: 'Geral',
  keywords: [],
  response: 'Desculpe, não entendi sua pergunta. Você pode reformular ou escolher uma das opções abaixo para que eu possa ajudá-lo melhor.',
  buttons: [
    { label: 'Falar com Atendente', action: 'contact', value: 'geral' }
  ]
};

// Mensagem de boas-vindas
export const welcomeMessage: ChatMessage = {
  id: 'welcome',
  text: 'Olá! 👋 Sou seu assistente virtual. Como posso ajudá-lo hoje? Escolha uma das opções abaixo ou digite sua dúvida:',
  sender: 'bot',
  timestamp: new Date(),
  buttons: quickSuggestions.map(suggestion => ({
    label: suggestion,
    action: 'message' as const,
    value: suggestion
  }))
};
