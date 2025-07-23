// script.js

document.addEventListener('DOMContentLoaded', () => {
    const shareButton = document.getElementById('shareButton');

    if (shareButton) {
        shareButton.addEventListener('click', async () => {
            // Informações que serão compartilhadas
            const petName = document.querySelector('.pet-header h1').textContent;
            const pageUrl = window.location.href; // A URL atual da sua landing page
            const fallbackText = `Encontrei o ${petName}! Acesse o cartão de identificação dele aqui: ${pageUrl}`;

            // Verifica se a API Web Share está disponível no navegador
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: `Identificação Pet: ${petName}`,
                        text: `Ajude o ${petName} a voltar para casa! Acesse o cartão de identificação completo:`,
                        url: pageUrl,
                    });
                    console.log('Conteúdo compartilhado com sucesso!');
                } catch (error) {
                    console.error('Erro ao compartilhar:', error);
                    // Em caso de erro ou cancelamento pelo usuário, pode-se usar um fallback
                    alert('Não foi possível compartilhar automaticamente. Por favor, copie e cole este link:\n' + pageUrl);
                }
            } else {
                // Fallback para navegadores que não suportam a API Web Share (geralmente desktops)
                // Aqui, apenas copiamos o link para a área de transferência
                navigator.clipboard.writeText(pageUrl)
                    .then(() => {
                        alert(`A função de compartilhamento nativo não está disponível aqui, mas o link da página foi copiado para a sua área de transferência!\n\n${pageUrl}`);
                        console.log('Link copiado para a área de transferência.');
                    })
                    .catch(err => {
                        console.error('Erro ao copiar o link:', err);
                        alert('Não foi possível compartilhar. Por favor, copie este link manualmente:\n' + pageUrl);
                    });
            }
        });
    }
});