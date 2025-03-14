<script>
    import { fetchApi, getCsrfToken } from '$lib/utils/api';
    import { onMount } from 'svelte';
    import { isAuthenticated } from '$lib/stores/auth';

    let csrfStatus = 'Not started';
    let loginStatus = 'Not started';
    let itemFetchStatus = 'Not started';
    let paintFetchStatus = 'Not started';
    let itemData = null;
    let csrfToken = null;
    let error = null;

    async function testCsrf() {
        csrfStatus = 'Loading...';
        try {
            csrfToken = await getCsrfToken();
            csrfStatus = csrfToken ? 'Success' : 'Failed (null token)';
        } catch (e) {
            csrfStatus = `Error: ${e.message}`;
            console.error('CSRF error:', e);
        }
    }

    async function testLogin() {
        loginStatus = 'Loading...';
        try {
            const response = await fetchApi('login/', {
                method: 'POST',
                body: JSON.stringify({
                    email: 'test@example.com',
                    password: 'TestPassword123!'
                })
            });
            loginStatus = 'Success';
            console.log('Login response:', response);
            $isAuthenticated = true;
        } catch (e) {
            loginStatus = `Error: ${e.message}`;
            console.error('Login error:', e);
        }
    }

    async function testFetchItem() {
        itemFetchStatus = 'Loading...';
        try {
            const item = await fetchApi('items/4/');
            itemData = item;
            itemFetchStatus = 'Success';
            console.log('Item data:', item);
        } catch (e) {
            itemFetchStatus = `Error: ${e.message}`;
            console.error('Item fetch error:', e);
        }
    }

    async function testFetchPaintItem() {
        paintFetchStatus = 'Loading...';
        try {
            const item = await fetchApi('paint/4/');
            itemData = item;
            paintFetchStatus = 'Success';
            console.log('Paint item data:', item);
        } catch (e) {
            paintFetchStatus = `Error: ${e.message}`;
            console.error('Paint fetch error:', e);
        }
    }

    onMount(() => {
        console.log('API Authentication test page mounted');
    });
</script>

<div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">API Authentication Test</h1>

    <div class="mb-6 border p-4 rounded">
        <h2 class="text-xl font-bold mb-2">CSRF Token Test</h2>
        <p class="mb-2">Status: <span class={csrfStatus === 'Success' ? 'text-green-600' : 'text-red-600'}>{csrfStatus}</span></p>
        <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            on:click={testCsrf}
        >
            Test CSRF Token
        </button>
        {#if csrfToken}
            <div class="mt-2">
                <p class="text-sm break-all">Token: {csrfToken}</p>
            </div>
        {/if}
    </div>

    <div class="mb-6 border p-4 rounded">
        <h2 class="text-xl font-bold mb-2">Login Test</h2>
        <p class="mb-2">Status: <span class={loginStatus === 'Success' ? 'text-green-600' : 'text-red-600'}>{loginStatus}</span></p>
        <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
            on:click={testLogin}
        >
            Test Login
        </button>
    </div>

    <div class="mb-6 border p-4 rounded">
        <h2 class="text-xl font-bold mb-2">Item Fetch Test (Generic Endpoint)</h2>
        <p class="mb-2">Status: <span class={itemFetchStatus === 'Success' ? 'text-green-600' : 'text-red-600'}>{itemFetchStatus}</span></p>
        <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            on:click={testFetchItem}
        >
            Fetch Item ID 4
        </button>
    </div>

    <div class="mb-6 border p-4 rounded">
        <h2 class="text-xl font-bold mb-2">Paint Item Fetch Test (Category Endpoint)</h2>
        <p class="mb-2">Status: <span class={paintFetchStatus === 'Success' ? 'text-green-600' : 'text-red-600'}>{paintFetchStatus}</span></p>
        <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            on:click={testFetchPaintItem}
        >
            Fetch Paint Item ID 4
        </button>
    </div>

    {#if itemData}
        <div class="mb-6 border p-4 rounded">
            <h2 class="text-xl font-bold mb-2">Item Data</h2>
            <pre class="bg-gray-100 p-4 overflow-auto max-h-96 rounded">{JSON.stringify(itemData, null, 2)}</pre>
        </div>
    {/if}
</div> 